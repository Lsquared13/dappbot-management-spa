import React, { FC, useState, useEffect } from 'react';
import { useResource } from 'react-request-hook';
import Alert from 'react-s-alert';
import { Button } from '../components/ui';
import { StringField } from '../components/fields';
import API from '../services/api';
import { passwordChecker, ConfirmPasswordResetArgs } from '../services/api/auth';
import {ChallengeData,ChallengeType, challengeDataFactory} from '../types'

interface MfaChallengeProps {
  email: string
  setChallenge: (challenge:ChallengeData)=>void
  setErr: (err:string)=>void
  API: API
}


export const ForgotPassChallenge:FC<MfaChallengeProps> = ({email, setChallenge, setErr, API})=>{
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [newPasswordResponse, requestNewPassword] = useResource(API.auth.confirmPasswordReset())
  const [newPassSent, markNewPassSent] = useState(false)

  const handleNewPassword = () => {
    const newPassDetails:ConfirmPasswordResetArgs = {
      'username': email,
      'newPassword': confirmPass,
      'passwordResetCode': code

    }
    markNewPassSent(true)
    requestNewPassword(newPassDetails,'password-reset')
  }
  useEffect(()=>{
    if(!newPassSent || newPasswordResponse.isLoading){
      return;
    }
    if(newPasswordResponse.error) {
      setErr(newPasswordResponse.error.message)
      markNewPassSent(false)
      Alert.error(`There was an error processing your new password: ${newPasswordResponse.error.message}`)
      return
    }else if(newPasswordResponse.data) {
      markNewPassSent(false);
      let response: any = newPasswordResponse.data
      // console.log("response.data: ", response.data)
      if(response.data) {
        Alert.success(`${response.data.message}`)
      }
      setChallenge(challengeDataFactory(ChallengeType.Default))
      return
    }
  }, [markNewPassSent,newPasswordResponse, newPassSent,  setChallenge])

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
      <Button disabled={loading} block onClick={handleNewPassword}>Submit</Button>
    </>
  )
}

export default ForgotPassChallenge;