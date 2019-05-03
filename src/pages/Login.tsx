import React, { FC, useState, useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';
import { CognitoUser } from '@aws-amplify/auth';
import isEmail from 'validator/lib/isEmail';
import { Button, Box, Text } from '../components/ui';
import { ErrorBox, ForgotPassChallenge, NewPassChallenge, MfaChallenge } from '../components';
import StringField from '../components/fields/StringField';
import Auth, { passwordChecker } from '../services/auth';


export interface LoginProps extends RouteComponentProps {
  setUser : (user:any)=>void
  user : any
}

export const Login:FC<LoginProps> = (props) => {
  const { user, setUser } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const [challenge, setChallenge] = useState('');




  const sendLogin = async () => {
    setLoading(true);
    setErr('');
    try {
      const result:any = await Auth.signIn(email, password);
      console.log(result);
      if (result.challenge) {
        setChallenge(result.challenge)
      }
      if (result.errMsg) {
        setErr(result.errMsg);
      }
      if (result.user) {
        setUser(result.user)
      }
      setLoading(false);
    } catch (e) {
      console.log('Send login failed: ',e);
    }
  }

  // If we now have a Cognito user and no challenge
  // TODO: This probably won't behave right, as CognitoUser
  // can match with an empty object.  Need to determine a good
  // property to check for.
  useEffect(()=>{
    if (challenge === '' && typeof user === typeof CognitoUser){
      props.navigate && props.navigate('/home');
    }
  }, [user, challenge])
  
  let loginFields = (
    <>
      <StringField 
        value={email} 
        onChange={setEmail} 
        displayName='Email'
        disabled={loading}
        isValid={isEmail}
        name='email' />
      <StringField 
        fieldType='password' 
        name='password'
        displayName='Password'
        disabled={loading}
        help="Minimum of 8 characters; include upper and lowercase letters, numbers, and a symbol."
        onChange={setPassword}
        isValid={()=>{return true}}
        value={password}/>
      <Button disabled={loading} onClick={sendLogin}>Submit</Button>
    </>
  )
  let challengeProps = {setChallenge, setErr}
  switch(challenge){
    case ('newPassword'):
      loginFields = <NewPassChallenge setUser={setUser} user={user} {...challengeProps} />
      break;
    case ('MFA'):
      loginFields = <MfaChallenge setUser={setUser} user={user} {...challengeProps} />
      break;
    case ('forgotPassword'):
      loginFields = <ForgotPassChallenge email={email} {...challengeProps} />
      break;  
  }
  return (
    <>
      { loginFields }  
      <ErrorBox errMsg={err}></ErrorBox>
    </>
  );
}

export default Login;