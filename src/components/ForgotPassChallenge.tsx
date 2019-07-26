import React, { FC, useState, useEffect } from 'react';
import { Button } from '../components/ui';
import { StringField } from '../components/fields';
import Auth, { passwordChecker, ConfirmPasswordResetArgs } from '../services/auth';
import { useResource } from 'react-request-hook';

import Alert from 'react-s-alert';
import {ChallengeData,ChallengeType, challengeDataFactory} from '../types'

interface MfaChallengeProps {
  email: string
  setChallenge: (challenge:ChallengeData)=>void
  setErr: (err:string)=>void
}


export const ForgotPassChallenge:FC<MfaChallengeProps> = ({email, setChallenge, setErr})=>{
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [newPasswordResponse, requestNewPassword] = useResource(Auth.confirmPasswordResetRequest())
  const [newPassSent, markNewPassSent] = useState(false)

  const handleNewPassword = (email: string, passwordResetCode:string, newPassword: string) => {
    const newPassDetails:ConfirmPasswordResetArgs = {
      'username': email,
      'newPassword': newPassword,
      'passwordResetCode': passwordResetCode

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
      console.log("response.data: ", response.data)
      if(response.data) {
        Alert.success(`${response.data.message}`)
      }
      setChallenge(challengeDataFactory(ChallengeType.Default))
      return
    }
  }, [markNewPassSent,newPasswordResponse, newPassSent,  setChallenge])
  // const sendForgotPass = async () => {
  //   if (newPass !== confirmPass){
  //     setErr('Your confirmation password does not match.')
  //     return false;
  //   }
  //   setErr('');
  //   setLoading(true);
  //   try {
  //     // await Auth.forgotPass(email, code, newPass);
  //     Alert.info(`Successfully changed your password!`)
  //     setChallenge(defaultChallengeData);
  //   } catch (e){
  //     setErr(e.toString());
  //   }
  //   setLoading(false);
  // }

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
      <Button disabled={loading} block onClick={()=>handleNewPassword(email, code, confirmPass)}>Submit</Button>
    </>
  )
}

export default ForgotPassChallenge;