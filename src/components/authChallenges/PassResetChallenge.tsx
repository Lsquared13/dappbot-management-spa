import React, { FC, useState, useEffect } from 'react';
import { useResource } from 'react-request-hook';
import Alert from 'react-s-alert';
import DappbotAPI from '@eximchain/dappbot-api-client';
import User from '@eximchain/dappbot-types/spec/user';
import { isSuccessResponse } from '@eximchain/dappbot-types/spec/responses';
import { ConfirmPassReset } from '@eximchain/dappbot-types/spec/methods/auth';
import { Button } from '../ui';
import { StringField } from '../fields';
import { getErrMsg } from '../../services/util';

interface PassResetChallengeProps {
  email: string
  setChallenge: (challenge:User.Challenges.Data)=>void
  setErr: (err:string)=>void
  API: DappbotAPI
}


export const PassResetChallenge:FC<PassResetChallengeProps> = ({email, setChallenge, setErr, API})=>{
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [code, setCode] = useState('');

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
  }, [error, data, setChallenge])

  return (
    <>
      <StringField name='code' 
        value={code} 
        displayName='Confirmation Code'
        help="This code was sent to you in an email just now."
        onChange={setCode} />
      <StringField 
        value={newPass}
        displayName='New Password'
        fieldType='password'
        isValid={User.validatePassword}
        help="Minimum of 8 characters; include upper and lowercase letters, numbers, and a symbol."
        onChange={setNewPass}
        name='newPassword' />
      <StringField 
        value={confirmPass}
        displayName='Confirm Password'
        fieldType='password'
        isValid={User.validatePassword}
        help="Must match the field above."
        onChange={setConfirmPass}
        name='confirmPassword' />
      <Button disabled={isLoading} block onClick={makeConfirmResetRequest}>Submit</Button>
    </>
  )
}

export default PassResetChallenge;