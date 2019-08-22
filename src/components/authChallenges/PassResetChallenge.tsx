import React, { FC, useState, useEffect } from 'react';
import { useResource } from 'react-request-hook';
import Alert from 'react-s-alert';
import { Button } from '../ui';
import { StringField } from '../fields';
import API, { challengeDataFactory } from '../../services/api';
import { passwordChecker, ConfirmPasswordResetArgs } from '../../services/api/auth';
import {ChallengeData,ChallengeType} from '../../types'
import { getErrMsg } from '../../services/util';

interface PassResetChallengeProps {
  email: string
  setChallenge: (challenge:ChallengeData)=>void
  setErr: (err:string)=>void
  API: API
}


export const PassResetChallenge:FC<PassResetChallengeProps> = ({email, setChallenge, setErr, API})=>{
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [code, setCode] = useState('');

  const [confirmResetResponse, requestConfirmReset] = useResource(API.auth.confirmPasswordReset())
  function makeConfirmResetRequest() {
    const newPassDetails:ConfirmPasswordResetArgs = {
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
    } else if (data && data.data) {
      Alert.success(`${data.data.message}`)
      setChallenge(challengeDataFactory(ChallengeType.Default))
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
        isValid={(val)=>passwordChecker.validate(val)}
        help="Minimum of 8 characters; include upper and lowercase letters, numbers, and a symbol."
        onChange={setNewPass}
        name='newPassword' />
      <StringField 
        value={confirmPass}
        displayName='Confirm Password'
        fieldType='password'
        isValid={(val)=>passwordChecker.validate(val)}
        help="Must match the field above."
        onChange={setConfirmPass}
        name='confirmPassword' />
      <Button disabled={isLoading} block onClick={makeConfirmResetRequest}>Submit</Button>
    </>
  )
}

export default PassResetChallenge;