import BaseChallengeBox, { ChallengeBoxInput } from './BaseChallengeBox';

import DappbotAPI from '@eximchain/dappbot-api-client';
import { isSuccessResponse } from '@eximchain/dappbot-types/spec/responses';
import User, { Challenges } from '@eximchain/dappbot-types/spec/user';
import { MfaLoginChallenge as MfaLogin } from '@eximchain/dappbot-types/spec/methods/auth';

import React, { FC, useState, useEffect } from 'react';
import Alert from 'react-s-alert';

import { useResource } from 'react-request-hook';

interface MfaChallengeBoxProps {
  API: DappbotAPI
  user : User.AuthData,
  challenge: Challenges.Data
  setUser: (user:User.AuthData)=>void
  setChallenge: (challenge: Challenges.Data)=>void
}

export const MfaChallengeBox:FC<MfaChallengeBoxProps> = ({user, challenge, setUser, setChallenge, API})=>{

  const [mfaCode, setMfaCode] = useState('');
  const [err, setErr] = useState('');

  const [mfaLoginResponse, requestMfaLogin] = useResource(API.auth.mfaLoginChallenge.resource);

  const makeMfaLoginRequest = async () => {
    const mfaLoginDetails:MfaLogin.Args = {
      'username': user.User.Username,
      'mfaLoginCode': mfaCode,
      'session': challenge.Session
    }
    requestMfaLogin(mfaLoginDetails)
  }
  const { error, data, isLoading } = mfaLoginResponse;
  useEffect(function handleMfaLoginResponse(){
    if(error){
      switch (error.code) {
        default: {
          let msg = "Error logging in with MFA. Check that your MFA device's clock is correct and that the code was input correctly.";
          setErr("Error logging in with MFA.");
          Alert.error(msg, { timeout: 4000 });
        }
      }
    }
    if(isSuccessResponse(data)){
      if (User.isAuthData(data.data)) setUser(data.data);
      setChallenge(Challenges.newData())
    }
  }, [error, data])

  const helpMsg = challenge.ChallengeName === Challenges.Types.AppMfa ?
                  "One-time password generated by an MFA App, such as Google Authenticator" :
                  "One-time password delivered via SMS message"
  return (
    <BaseChallengeBox title='Multi-Factor Authentication'
      errorMsg={err}
      onClick={makeMfaLoginRequest}
      disabled={isLoading} >
        <ChallengeBoxInput 
          value={mfaCode}
          displayName='Two-factor Auth Code'
          fieldType='number'
          disabled={isLoading}
          help={helpMsg}
          onChange={setMfaCode}
          onPressEnter={makeMfaLoginRequest}
          name='mfaCode' /> 
    </BaseChallengeBox>
  );
}

export default MfaChallengeBox;