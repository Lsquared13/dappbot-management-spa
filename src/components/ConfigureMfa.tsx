import CustomConfirmFactory from './CustomConfirmAlert';
import { Text, Button, EasyInputGroup } from './ui';
import { NumberField, Uints } from '../components/fields';
import { getErrMsg } from '../services/util';

import DappbotAPI from '@eximchain/dappbot-api-client';
import { isSuccessResponse } from '@eximchain/dappbot-types/spec/responses';
import { Challenges } from '@eximchain/dappbot-types/spec/user';
import { BeginSetupAppMfa, ConfirmSetupAppMfa, SetMfaPreference } from '@eximchain/dappbot-types/spec/methods/auth';

import React, { FC, useState, useEffect, } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import Alert from 'react-s-alert';
import { useResource } from 'react-request-hook';

import QRCode from 'qrcode.react';
import { XOR } from 'ts-xor';
import Track from '../services/analytics';

export interface ConfigureMfaProps {
  email: string
  API: DappbotAPI
  refreshToken: string
  loadingData: boolean
  preferredMfa: XOR<Challenges.MfaTypes, null>
}

export const ConfigureMfa: FC<ConfigureMfaProps> = ({ email, API, refreshToken, loadingData, preferredMfa }) => {
  const [appMfaSetupSecret, setAppMfaSetupSecret] = useState('');
  const [appMfaVerifyCode, setAppMfaVerifyCode] = useState('');
  // mfaStateLoading is used to avoid displaying out-of-date data while waiting for login refresh
  // TODO: Use Reducks to manage user and remove this loading state
  const [mfaStateLoading, setMfaStateLoading] = useState(false);

  const [beginSetupAppMfaResponse, requestBeginSetupAppMfa] = useResource(API.auth.beginSetupAppMfa.resource);
  const [confirmSetupAppMfaResponse, requestConfirmSetupAppMfa] = useResource(API.auth.confirmSetupAppMfa.resource);
  const [setMfaPreferenceResponse, requestSetPreferredMfa] = useResource(API.auth.setMfaPreference.resource);

  function beginConfigureMfa() {
    const beginConfigureMfaDetails:BeginSetupAppMfa.Args = {
      'refreshToken': refreshToken
    }
    requestBeginSetupAppMfa(beginConfigureMfaDetails)
  }
  useEffect(function handleBeginSetupMfaResponse() {
    const { error, data } = beginSetupAppMfaResponse;
    if(error){
      switch (error.code) {
        default: {
          let msg = `Error beginning MFA setup : ${getErrMsg(error)}`
          Alert.error(msg);
        }
      }
    }
    if(isSuccessResponse(data)){
      setAppMfaSetupSecret(data.data.secretCode)
    }
  }, [beginSetupAppMfaResponse.error, beginSetupAppMfaResponse.data])

  function confirmAppMfa() {
    const confirmAppMfaDetails:ConfirmSetupAppMfa.Args = {
      'refreshToken': refreshToken,
      'mfaVerifyCode': appMfaVerifyCode
    }
    requestConfirmSetupAppMfa(confirmAppMfaDetails)
  }
  useEffect(function handleConfirmSetupMfaResponse() {
    const { error, data } = confirmSetupAppMfaResponse;
    if(error){
      switch (error.code) {
        default: {
          let msg = `Error confirming MFA setup : ${getErrMsg(error)}`
          Alert.error(msg);
        }
      }
    }
    if(isSuccessResponse(data)){
      enableAppMfa()
    }
  }, [confirmSetupAppMfaResponse.error, confirmSetupAppMfaResponse.data])

  function enableAppMfa() {
    const enableMfaDetails:SetMfaPreference.Args = {
      'mfaEnabled': true,
      'preferredMfa': Challenges.Types.AppMfa
    }
    requestSetPreferredMfa(enableMfaDetails)
    setMfaStateLoading(true)
  }
  function disableMfa() {
    const disableMfaDetails:SetMfaPreference.Args = {
      'mfaEnabled': false
    }
    const makeDisableRequest = () => {
      requestSetPreferredMfa(disableMfaDetails)
      setMfaStateLoading(true)
    }
    confirmAlert({
      customUI: CustomConfirmFactory({
        title: 'Confirm Disable MFA',
        message: [
          'You are about to disable MFA.',
          'Login will no longer require confirmation with an MFA code. This may increase the risk of unauthorized access to your account.',
          'Your existing MFA App association will be removed. You will need to perform MFA setup again to re-enable MFA.',
          'Would you like to continue?'
        ],
        onConfirm: makeDisableRequest
      })
    })
  }
  useEffect(function handleSetMfaPreferenceResponse() {
    const { error, data } = setMfaPreferenceResponse;
    if(error){
      switch (error.code) {
        default: {
          let msg = `Error setting MFA preference : ${getErrMsg(error)}`
          Alert.error(msg);
        }
      }
    }
    if(isSuccessResponse(data)){
      switch (data.data.enabledMfa) {
        case Challenges.Types.AppMfa:
          setAppMfaSetupSecret('');
          setAppMfaVerifyCode('');
        case Challenges.Types.SmsMfa:
          Alert.success("MFA successfully enabled");
          Track.appMfaEnabled(email)
          break;
        default:
          Track.appMfaDisabled(email);
          Alert.success("MFA successfully disabled");
          break;
      }
      let refreshPromise = API.loginViaRefresh();
      refreshPromise.then(result=>{
        setMfaStateLoading(false);
      }).catch(error=>{
        Alert.error(`Error refreshing login: ${error}`);
        setMfaStateLoading(false);
      });
    }
  }, [setMfaPreferenceResponse.error, setMfaPreferenceResponse.data])

  let configureMfaElement:JSX.Element;
  if (appMfaSetupSecret) {
    // User initiated App MFA setup and is being presented a secret code
    let label = "DappBot"
    let qrValue = `otpauth://totp/${label}:${email}?secret=${appMfaSetupSecret}&issuer=${label}`;
    configureMfaElement = (
      <>
        <QRCode value={qrValue}
          renderAs='svg'
          size={192} />
        <NumberField name='appMfaVerifyCode'
        value={appMfaVerifyCode}
        placeholder={'App-Generated MFA Code'}
        size={Uints.size32}
        onChange={setAppMfaVerifyCode} />
        <Button onClick={confirmAppMfa}
          size='small'
          theme='outlineBlue'
          disabled={loadingData || confirmSetupAppMfaResponse.isLoading || setMfaPreferenceResponse.isLoading}>
          Verify Code
        </Button>
      </>
    );
  } else {
    let mfaStatusDisplay:string;
    let mfaBtnDisplay:string;
    let mfaCallLoading:boolean;
    let mfaBtnOnClick:()=>void;
    if (loadingData || mfaStateLoading) {
      mfaStatusDisplay = "Loading...";
      mfaBtnDisplay = "Configure MFA";
      mfaCallLoading = true;
      mfaBtnOnClick = ()=>{};
    } else {
      switch (preferredMfa) {
        case Challenges.Types.AppMfa:
        case Challenges.Types.SmsMfa:
          mfaStatusDisplay = preferredMfa === Challenges.Types.AppMfa ? "App-based MFA Enabled" : "SMS MFA Enabled";
          mfaBtnDisplay = "Disable MFA";
          mfaCallLoading = setMfaPreferenceResponse.isLoading;
          mfaBtnOnClick = disableMfa;
          break;
        default:
          mfaStatusDisplay = "MFA Disabled";
          mfaBtnDisplay = "Set Up MFA";
          mfaCallLoading = beginSetupAppMfaResponse.isLoading;
          mfaBtnOnClick = beginConfigureMfa;
          break;
      }
    }

    configureMfaElement = (
      <>
        <Text className='marginBottom1'>{mfaStatusDisplay}</Text>
        <Button onClick={mfaBtnOnClick}
          size='small'
          theme='outlineBlue'
          disabled={loadingData || mfaCallLoading}>
          {mfaBtnDisplay}
        </Button>
      </>
    );
  }

  return (
    <EasyInputGroup title='MFA Configuration'>
      {configureMfaElement}
    </EasyInputGroup>
  )
}

export default ConfigureMfa;