import React, { FC, useState } from 'react';
import { Button } from '../ui';
import { StringField } from '../fields';
import {UserResponseData} from '../../types'

interface MfaChallengeProps {
  user: UserResponseData
  setUser: (user:UserResponseData)=>void
  setErr: (err:string)=>void
  setChallenge: (challenge:string)=>void
}

export const MfaChallenge:FC<MfaChallengeProps> = ({user, setUser, setErr, setChallenge})=>{

  const [mfa, setMfa] = useState('');
  const [loading, setLoading] = useState(false);
  const sendMfa = async () => {
    setErr('');
    setLoading(true);
    try {
      //TODO: implement the new version of MFA api
      setChallenge('');
    } catch (e) {
      setErr(e.toString())
    }
    setLoading(false);
  }

  return (
    <>
      <StringField name='mfa' 
        value={mfa}  
        displayName="Two-factor Auth Code"
        help="This code is generated by an app like Duo or Google Authenticator."
        onChange={setMfa} />
      <Button disabled={loading} block onClick={sendMfa}>Submit</Button>
    </>
  )
}

export default MfaChallenge;