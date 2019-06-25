import React, { FC, useState } from 'react';
import { Button } from '../components/ui';
import { StringField } from '../components/fields';
import Auth, { passwordChecker } from '../services/auth';
import Alert from 'react-s-alert';


interface MfaChallengeProps {
  email: string
  setChallenge: (challenge:string)=>void
  setErr: (err:string)=>void
}


export const ForgotPassChallenge:FC<MfaChallengeProps> = ({email, setChallenge, setErr})=>{
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const sendForgotPass = async () => {
    if (newPass !== confirmPass){
      setErr('Your confirmation password does not match.')
      return false;
    }
    setErr('');
    setLoading(true);
    try {
      await Auth.forgotPass(email, code, newPass);
      Alert.info(`Successfully changed your password!`)
      setChallenge('');
    } catch (e){
      setErr(e.toString());
    }
    setLoading(false);
  }

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
      <Button disabled={loading} block onClick={sendForgotPass}>Submit</Button>
    </>
  )
}

export default ForgotPassChallenge;