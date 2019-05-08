import React, { FC, useState, useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';
import { CognitoUser } from '@aws-amplify/auth';
import isEmail from 'validator/lib/isEmail';
import { Button, Box, Text } from '../components/ui';
import { ErrorBox, ForgotPassChallenge, NewPassChallenge, MfaChallenge } from '../components';
import StringField from '../components/fields/StringField';
import Auth, { passwordChecker } from '../services/auth';

import Navigation from '../components/froala/Navigation';
import '../components/froala/bootstrap.min.css';
import '../components/froala/froala_blocks.min.css';


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
                    help="Minimum of 8 characters; include upper and lowercase letters, numbers, and a symbol."
                    onChange={setPassword}
                    errorMsg="Your password must be at least 8 characters long.  Please include both upper and lowercase letters, a number, and a symbol."
                    isValid={(newVal)=>{return passwordChecker.validate(newVal)}}
                    value={password}/>
                    <p className="text-right">Don't have an account yet? <a href="/signup">Sign Up</a></p>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col">
                    <div style={{textAlign: "left"}}>
                      <Button disabled={loading} onClick={sendLogin}>Submit</Button>
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
  }
  return (
    <>
      <Navigation hideLogin={true} />
      { loginFields }  
      <ErrorBox errMsg={err}></ErrorBox>
    </>
  );
}

export default Login;