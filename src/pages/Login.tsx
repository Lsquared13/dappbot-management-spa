import React, { FC, useState, useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';
import isEmail from 'validator/lib/isEmail';
import { Button } from '../components/ui';
import StringField from '../components/fields/StringField';
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
import { ErrorBox, NewPassChallenge, ForgotPassChallenge } from '../components';


export interface LoginProps extends RouteComponentProps {
  setUser: (user: UserResponseData) => void
  user: UserResponseData,
  API: API
}

export const Login: FC<LoginProps> = (props) => {
  const { user, setUser, navigate, API } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const initialChallenge = challengeDataFactory(ChallengeType.Default);
  const [challenge, setChallenge] = useState(initialChallenge);
  const [signInResponse, requestSignIn] = useResource(API.auth.signIn())
  const [beginPasswordResetResponse, beginPasswordReset] = useResource(API.auth.beginPasswordReset())
  //Response Handler
  const [signInSent, markSignInSent] = useState(false)
  const [passwordResetSent, markPasswordResetSent] = useState(false);

  const handleSignIn = () => {
    const loginDetails: SignInArgs = {
      'username': email,
      'password': password
    }
    markSignInSent(true)
    requestSignIn(loginDetails)
  }

  useEffect(function handleLoginResult() {
    if (signInSent) {
      if (signInResponse.isLoading) {
        Alert.info("Authenticating ...", { timeout: 750 });

      }
      else if (signInResponse.error) {
        markSignInSent(false)
        console.log(signInResponse.error)
        switch (signInResponse.error.code) {

          default: {
            Alert.error(signInResponse.error.data.err.message);
          }
        }

      }
      else if (signInResponse.data) {
        markSignInSent(false)

        let response = signInResponse.data.data;
        //Ensure that the response has a session, and if so create a tempUser
        if (response.Session) {
          //This tempUser refers to when the password needs to be reset for the first login.
          let tempUser = emptyUserResponse()
          tempUser.User.Username = email

          setUser(tempUser)
          setChallenge(response)

        }
        if (response.Authorization) {
          setUser(response)
          setChallenge(challengeDataFactory(ChallengeType.Default))
          Alert.success("Authenticated with credentials for: " + response.User.Email)
        }

      }
    }
  }, [signInResponse])

  const handleForgottenPass = () => {
    const forgottenPassDetails: BeginPasswordResetArgs = {
      'username': email
    }
    markPasswordResetSent(true)
    beginPasswordReset(forgottenPassDetails)

  }

  useEffect(function handlePassResetResult() {
    if (passwordResetSent) {
      if (beginPasswordResetResponse.isLoading) {
        Alert.info("Attempting password reset", { timeout: 1750 });

      }
      else if (beginPasswordResetResponse.error) {
        markPasswordResetSent(false);

        console.log(beginPasswordResetResponse.error)
        switch (beginPasswordResetResponse.error.code) {
          case '401': {
            Alert.error("Unauthorized");
            break;
          }
          default: {
            Alert.error("Failed to reset password, check the username field and make sure it is a valid email address");
          }
        }

      }
      else if (beginPasswordResetResponse.data) {
        markPasswordResetSent(false)
        setChallenge(challengeDataFactory(ChallengeType.ForgotPassword))

      }
    }
  }, [beginPasswordResetResponse])

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
                onPressEnter={handleSignIn}
                value={password} />
              <p className="text-center">Don't have an account yet? <a href="/signup">Sign Up</a></p>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col">
              <div style={{ display: "flex", justifyContent: "space-between"  }}>
                <Button disabled={loading} onClick={handleSignIn}>Log In</Button>
                <Button onClick={handleForgottenPass} style='standard' theme='outlineBlue'>Forgot Password?</Button>
                <ErrorBox errMsg={err}></ErrorBox>
              </div>
              {/* <button className="btn btn-primary" type="button">Submit</button> */}
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
          <ForgotPassChallenge email={email} API={API} {...challengeProps} />
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
