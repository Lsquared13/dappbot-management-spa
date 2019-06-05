import React, { FC, useState, useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';
import isEmail from 'validator/lib/isEmail';
import { Button } from '../components/ui';
import StringField from '../components/fields/StringField';
import Auth from '../services/auth';

import '../components/froala/bootstrap.min.css';
import '../components/froala/froala_blocks.min.css';
import { ErrorBox, NewPassChallenge, MfaChallenge, ForgotPassChallenge } from '../components';


export interface LoginProps extends RouteComponentProps {
  setUser : (user:any)=>void
  user : any
}

export const Login:FC<LoginProps> = (props) => {
  const { user, setUser, navigate } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const [challenge, setChallenge] = useState('');




  const sendLogin = async () => {
    setLoading(true);
    setChallenge('');
    setErr('');
    setUser({});
    try {
      const result:any = await Auth.signIn(email, password);    
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
    if (challenge === '' && user.signInUserSession && user.signInUserSession.accessToken){
      navigate && navigate('/home');
    }
  }, [user.signInUserSession, challenge, navigate])
  
  let loginFields = (
    <>
      <section className="fdb-block fp-active" data-block-type="forms">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-7 col-md-5 text-center">
              <div className="fdb-box fdb-touch">
                <div className="row">
                  <div className="col">
                    <h2>Log In to Your Account</h2>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col">
                    {/* <input type="text" className="form-control" placeholder="Email" /> */}
                    <StringField 
                    value={email} 
                    onChange={setEmail} 
                    displayName='Email'
                    disabled={loading}
                    isValid={isEmail}
                    name='email' />
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col">
                    {/* <input type="password" className="form-control mb-1" placeholder="Password" /> */}
                    <StringField 
                    fieldType='password' 
                    name='password'
                    displayName='Password'
                    disabled={loading}
                    onChange={setPassword}
                    value={password}/>
                    <p className="text-right">Don't have an account yet? <a href="/signup">Sign Up</a></p>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col">
                    <div style={{textAlign: "left"}}>
                      <Button disabled={loading} onClick={sendLogin}>Submit</Button>
                      <ErrorBox errMsg={err}></ErrorBox>
                    </div>
                    {/* <button className="btn btn-primary" type="button">Submit</button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
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
    default:
      // Always have a default to keep TS quiet
      break; 
  }
  return loginFields;
}

export default Login;