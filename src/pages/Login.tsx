import React, { FC, useState, useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';
import isEmail from 'validator/lib/isEmail';
import { Button, Checkbox } from '../components/ui';
import { StringField } from '../components/fields';
import Alert from 'react-s-alert';
import { useResource } from 'react-request-hook';
import {
  UserResponseData, emptyUserResponse,
  ChallengeType
} from '../types';
import API from '../services/api';
import { challengeDataFactory } from '../services/api/types';
import { BeginPasswordResetArgs, SignInArgs } from '../services/api/auth';
import '../components/froala/bootstrap.min.css';
import '../components/froala/froala_blocks.min.css';
import { ErrorBox, NewPassChallenge, PassResetChallenge } from '../components';
import { getErrMsg } from '../services/util';


export interface LoginProps extends RouteComponentProps {
  rememberUser: boolean
  setRememberUser: (shouldRemember:boolean) => void
  setUser: (user: UserResponseData) => void
  user: UserResponseData,
  API: API
}

export const Login: FC<LoginProps> = (props) => {
  const { user, setUser, navigate, API, rememberUser, setRememberUser } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [err, setErr] = useState('');
  const initialChallenge = challengeDataFactory(ChallengeType.Default);
  const [challenge, setChallenge] = useState(initialChallenge);
  const [signInResponse, requestSignIn] = useResource(API.auth.signIn())
  const [passResetResponse, requestPassReset] = useResource(API.auth.beginPasswordReset())

  function makeSignInRequest() {
    const loginDetails: SignInArgs = {
      'username': email,
      'password': password
    }
    requestSignIn(loginDetails)
  }
  useEffect(function handleSignInResult() {
    const { isLoading, error, data } = signInResponse;
    if (isLoading) {
      Alert.info("Authenticating ...", { timeout: 750 });
      return;
    }
    else if (error) {
      console.log('Error signing in : ',error)
      switch (error.code) {
        default: {
          Alert.error(`Error signing in : ${getErrMsg(error)}`);
          return;
        }
      }
    }
    else if (data) {
      // A Session implies more challenges
      if (data.data.Session) {
        //This tempUser refers to when the password needs to be reset for the first login.
        let tempUser = emptyUserResponse()
        tempUser.User.Username = email
        setUser(tempUser)
        setChallenge(data.data)
      }

      // Authorization implies success
      if (data.data.Authorization) {
        setUser(data.data)
        setChallenge(challengeDataFactory(ChallengeType.Default))
        Alert.success("Authenticated with credentials for: " + data.data.User.Email)
      }

    }
  }, [signInResponse])

  function makePassResetRequest() {
    const forgottenPassDetails: BeginPasswordResetArgs = {
      'username': email
    }
    requestPassReset(forgottenPassDetails)
  }
  useEffect(function handlePassResetResult() {
    const { isLoading, error, data } = passResetResponse;
    if (isLoading) {
      Alert.info("Attempting password reset", { timeout: 1750 })
    }
    else if (error) {
      console.log(error)
      switch (error.code) {
        case '401': {
          Alert.error("Authorization failure when resetting your password.");
          break;
        }
        default: {
          Alert.error("Failed to reset password, check the username field and make sure it is a valid email address");
        }
      }
    }
    else if (data) {
      setChallenge(challengeDataFactory(ChallengeType.ForgotPassword))
    }
  }, [passResetResponse])

  useEffect(function handleChallengeResult() {
    if (challenge.ChallengeName === ChallengeType.Default && user.Authorization !== '' && user.User) {
      navigate && navigate('/home');
    }
  }, [challenge, setChallenge, user, navigate])


  let loginFields;
  let challengeProps = { setChallenge, setErr }

  switch (challenge.ChallengeName) {

    default:
      loginFields = (
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
                disabled={signInResponse.isLoading}
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
                disabled={signInResponse.isLoading}
                onChange={setPassword}
                onPressEnter={makeSignInRequest}
                value={password} />
            </div>
          </div>
          <div className='row mt-4'>
            <div className='col flex d-flex flex-row'>
                <div className='mt-1'>
                <Checkbox id='remember-login' checked={rememberUser} onChange={({ checked }) => setRememberUser(checked)} />
                </div>
                <label htmlFor='remember-login' className='text-left mr-2 pl-2'>
                  Remember You?  Uncheck if you're using a shared computer.
                </label>
              </div>
          </div>
          <div className="row mt-4">
            <div className="col">
              <div style={{ display: "flex", justifyContent: "space-between"  }}>
                <Button disabled={signInResponse.isLoading} onClick={makeSignInRequest}>Log In</Button>
                <Button onClick={makePassResetRequest} style='standard' theme='outlineBlue'>Forgot Password?</Button>
                <ErrorBox errMsg={err}></ErrorBox>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col">
              <div className='mt-4' style={{ display: "flex", justifyContent: "space-between"  }}>
                <p className="text-center">Don't have an account yet? <a href="/signup">Sign Up</a></p>
              </div>
            </div>
          </div>
        </div>
      )
      break;
    case (ChallengeType.NewPasswordRequired):
      loginFields = (
        <NewPassChallenge setUser={setUser}
          user={user}
          API={API}
          challenge={challenge}
          {...challengeProps} />)
      break;

    case (ChallengeType.Mfa):
      // loginFields = <MfaChallenge setUser={setUser} user={user} {...challengeProps} />
      break;

    case (ChallengeType.ForgotPassword):
      loginFields =
        <React.Fragment>
          <div className="row">
            <div className="col">
              <h2>Set New Password</h2>
            </div>
          </div>
          <PassResetChallenge email={email} API={API} {...challengeProps} />
        </React.Fragment>

      break;

  }
  return (
    <section className="fdb-block fp-active" data-block-type="forms">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-7 text-center">
            {loginFields}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login;
