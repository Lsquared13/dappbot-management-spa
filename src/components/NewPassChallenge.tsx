import React, { FC, useState } from 'react';
import { Button } from '../components/ui';
import { ErrorBox } from '../components';
import { StringField } from '../components/fields';
import Auth, {passwordChecker} from '../services/auth';
import { CognitoUser } from '@aws-amplify/auth';

interface NewPassChallengeProps {
  user : CognitoUser
  setChallenge : (challenge:string)=>void
  setErr: (err:string)=>void
  setUser: (user:any)=>void
}

export const NewPassChallenge:FC<NewPassChallengeProps> = ({setErr, setChallenge, user, setUser})=>{
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const [loading, setLoading] = useState(true);
  const sendNewPass = async () => {
    if (newPass !== confirmPass){
      setErr('The confirmation password does not match.');
      return false;
    }
    setLoading(true);
    try {
      const fullUser = await Auth.newPassword(user, newPass);
      setUser(fullUser);
      setChallenge('');
    } catch (e) {
      setErr(e.toString())
    }
    setLoading(false);
  }
  return (
    <>
      <StringField 
        value={newPass}
        displayName='New Password'
        fieldType='password'
        disabled={loading}
        isValid={passwordChecker.validate}
        help="Minimum of 8 characters; include upper and lowercase letters, numbers, and a symbol."
        onChange={setNewPass}
        name='newPassword' />
      <StringField 
        value={confirmPass}
        displayName='Confirm New Password'
        fieldType='password'
        disabled={loading}
        isValid={passwordChecker.validate}
        help="Must match field above."
        onChange={setConfirmPass}
        name='confirmPassword' />
      <Button onClick={sendNewPass} disabled={loading}>Submit</Button>
    </>
  )
}

export default NewPassChallenge;