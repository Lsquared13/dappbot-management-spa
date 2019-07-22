import React, { FC, useState, useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';
import isEmail from 'validator/lib/isEmail';
import { Button } from '../components/ui';
import StringField from '../components/fields/StringField';
import Alert from 'react-s-alert';
import { useResource } from 'react-request-hook';


import Auth from '../services/auth';

import '../components/froala/bootstrap.min.css';
import '../components/froala/froala_blocks.min.css';
import { ErrorBox, NewPassChallenge, MfaChallenge, ForgotPassChallenge } from '../components';
import { CognitoUser } from '@aws-amplify/auth';


export interface LoginProps extends RouteComponentProps {
  setUser: (user: any) => void
  user: any
}

export const Login: FC<LoginProps> = (props) => {
  const { user, setUser, navigate } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const [challenge, setChallenge] = useState('');
  const [signInResponse, requestSignIn] = useResource(Auth.signIn())
  const [resetResponse, requestReset] = useResource(Auth.newPassword())
  //Response Handler
  const [signInSent, markSignInSent] = useState(false)
  const [resetSent, markResetSent] = useState(false);

  const handleSignIn = (email: string, password: string) => {
    const loginDetails = {
      'username': email,
      'password': password
    }
    markSignInSent(true)
    requestSignIn(loginDetails, 'login')
  }




  const handleForgotPass = async () => {
    markResetSent(true);
    setErr('')
    requestReset({
      'username': email
    }, 'password-reset')
    if (email === "") return;

    setLoading(true)
    if (email === "") {
      throw Error("Invalid Email")
    }
    const result: any = await Auth.forgotPassword(email)
    if (result.errMsg) {
      setErr(result.errMsg);
    } else {
      Alert.info(`We sent an email to reset your password at this email: ${email}`)
      setChallenge('forgotPassword')
    }
    setLoading(false)
  }

  useEffect(function handleResetResult(){
    if (resetResponse.error){
      setErr(resetResponse.error.message);
      markResetSent(false);
      return;
    }
    if (
      !resetResponse.isLoading &&
      resetResponse.data &&
      signInSent
    ) {

    }
  }, [resetResponse, markResetSent])

  useEffect(() => {
    if (challenge === '' && user.Authorization) {
      navigate && navigate('/home');
    }
  }, [challenge, user, navigate])

  // If we now have a Cognito user and no challenge
  // TODO: This probably won't behave right, as CognitoUser
  // can match with an empty object.  Need to determine a good
  // property to check for.
  useEffect(() => {
    console.log('hello')
    console.log()
    if (!signInSent || signInResponse.isLoading) {
      return;
    }
    if (signInResponse.error) {
      setErr(signInResponse.error.message)
      markSignInSent(false);
      Alert.error(`There was an error signing in: ${signInResponse.error.message}`)
      return;
    } else if (signInResponse.data) {
      markSignInSent(false);
      let response: any = signInResponse.data
      if (response.Authorization) {
        const { Authorization, User, Refresh } = response;
        setUser({
          user: User,
          Authorization, Refresh
        })
      }
      if (response.ChallengeName) {
        setChallenge(response.data.ChallengeName)
        // TODO: Follow challenge param
      }
      // @ts-ignore
      Alert.success(`${signInResponse.data.message}`)
    }

  }, [user, challenge, signInSent, markSignInSent, signInResponse])


  let loginFields = (
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
            value={password} />
          <p className="text-right">Don't have an account yet? <a href="/signup">Sign Up</a></p>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col">
          <div style={{ textAlign: "left" }}>
            <Button disabled={loading} onClick={() => handleSignIn(email, password)}>Submit</Button>
            {/* <Button onClick={handleForgotPass}>Forgot Password?</Button> */}
            <ErrorBox errMsg={err}></ErrorBox>
          </div>
          {/* <button className="btn btn-primary" type="button">Submit</button> */}
        </div>
      </div>
    </div>
  )
  let challengeProps = { setChallenge, setErr }
  switch (challenge) {
    case ('NEW_PASSWORD_REQUIRED'):
      loginFields = <NewPassChallenge setUser={setUser} user={user} {...challengeProps} />
      break;
    case ('MFA'):
      loginFields = <MfaChallenge setUser={setUser} user={user} {...challengeProps} />
      break;
    case ('forgotPassword'):
      loginFields =
        <React.Fragment>
          <div className="row">
            <div className="col">
              <h2>Set New Password</h2>
            </div>
          </div>
          <ForgotPassChallenge email={email} {...challengeProps} />
        </React.Fragment>

      break;
    default:
      // Always have a default to keep TS quiet
      break;
  }
  return (
    <section className="fdb-block fp-active" data-block-type="forms">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-7 col-md-5 text-center">
            {loginFields}
          </div>
        </div>
      </div>
    </section>
  )

    ;
}

export default Login;