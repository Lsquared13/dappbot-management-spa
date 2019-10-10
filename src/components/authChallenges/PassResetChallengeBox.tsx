import BaseChallengeBox, { ChallengeBoxInput } from './BaseChallengeBox';
import { getErrMsg } from '../../services/util';

import DappbotAPI from '@eximchain/dappbot-api-client';
import { isSuccessResponse } from '@eximchain/dappbot-types/spec/responses';
import User, { Challenges, validatePassword } from '@eximchain/dappbot-types/spec/user';
import { ConfirmPassReset } from '@eximchain/dappbot-types/spec/methods/auth';

import React, { FC, useState, useEffect } from 'react';
import Alert from 'react-s-alert';
import { useResource } from 'react-request-hook';

interface PassResetChallengeBoxProps {
  API: DappbotAPI
  email: string,
  setChallenge: (challenge: Challenges.Data)=>void
}


export const PassResetChallengeBox:FC<PassResetChallengeBoxProps> = ({ API, email, setChallenge })=>{
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [code, setCode] = useState('');
  const [err, setErr] = useState('');

  const [confirmResetResponse, requestConfirmReset] = useResource(API.auth.confirmPasswordReset.resource);
  function makeConfirmResetRequest() {
    const newPassDetails:ConfirmPassReset.Args = {
      'username': email,
      'newPassword': confirmPass,
      'passwordResetCode': code
    }
    requestConfirmReset(newPassDetails)
  }
  const { isLoading, error, data } = confirmResetResponse;
  useEffect(function handleConfirmResetResponse() {
    if (error) {
      switch (error.code) {
        default: {
          let msg = `Error resetting your password : ${getErrMsg(error)}`
          setErr(msg)
          Alert.error(msg);
          break;
        }
      }
    } else if (isSuccessResponse(data)) {
      Alert.success(`${data.data.message}`)
      setChallenge(User.Challenges.newData())
    }
  }, [error, data])

  const matchesNewPass = (pass:string) => pass === newPass;

  return (
    <BaseChallengeBox title='Reset Forgotten Password'
      errorMsg={err}
      onClick={makeConfirmResetRequest}
      disabled={isLoading || !matchesNewPass(confirmPass) || !validatePassword(newPass)} >
        <ChallengeBoxInput 
          value={code}
          displayName='Confirmation Code'
          fieldType='number'
          disabled={isLoading}
          help="This code was sent to you in an email just now."
          onChange={setCode}
          name='code' /> 
        <ChallengeBoxInput 
          value={newPass}
          displayName='New Password'
          fieldType='password'
          disabled={isLoading}
          isValid={validatePassword}
          help="Minimum of 8 characters; include upper and lowercase letters, numbers, and a symbol."
          errorMsg="Passwords must be at least 8 characters long, including upper and lowercase letters, a number, and a symbol."
          onChange={setNewPass}
          name='newPassword' /> 
        <ChallengeBoxInput
          value={confirmPass}
          displayName='Confirm New Password'
          fieldType='password'
          disabled={isLoading}
          isValid={matchesNewPass}
          help="Must match field above."
          errorMsg="Make sure this matches the field above."
          onChange={setConfirmPass}
          onPressEnter={makeConfirmResetRequest}
          name='confirmPassword' />
    </BaseChallengeBox>
  )
}

export default PassResetChallengeBox;