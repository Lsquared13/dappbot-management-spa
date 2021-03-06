import React, { FC, useState, useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';
import isEmail from 'validator/lib/isEmail';
import DappbotAPI from '@eximchain/dappbot-api-client';
import User, { Challenges } from '@eximchain/dappbot-types/spec/user';
import Auth from '@eximchain/dappbot-types/spec/methods/auth';
import { Button, Checkbox } from '../components/ui';
import { StringField } from '../components/fields';
import Alert from 'react-s-alert';
import { useResource } from 'react-request-hook';
import '../components/froala/bootstrap.min.css';
import '../components/froala/froala_blocks.min.css';
import { ErrorBox, ChallengeBox } from '../components';
import { getErrMsg } from '../services/util';
import Responses from '@eximchain/dappbot-types/spec/responses';
import Track from '../services/analytics';

export interface LoginProps extends RouteComponentProps {
  rememberUser: boolean
  setRememberUser: (shouldRemember: boolean) => void
  setUser: (user: User.AuthData) => void
  user: User.AuthData,
  API: DappbotAPI
}

export const Login: FC<LoginProps> = (props) => {
  const { user, setUser, navigate, API, rememberUser, setRememberUser } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [err, setErr] = useState('');
  const [challenge, setChallenge] = useState(User.Challenges.newData());
  const [signInResponse, requestSignIn] = useResource(API.auth.login.resource)

  function makeSignInRequest() {
    const loginDetails: Auth.Login.Args = {
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
      console.log('Error signing in : ', error)
      switch (error.code) {
        default: {
          Alert.error(`Error signing in : ${getErrMsg(error)}`);
          return;
        }
      }
    }
    else if (Responses.isSuccessResponse(data)) {
      if (Challenges.isData(data.data)) {
        //This tempUser refers to when the password needs to be reset for the first login.
        let challenge = data.data;
        let tempUser = User.newAuthData()
        tempUser.User.Username = email
        setUser(tempUser)
        setChallenge(challenge)
      } else if (User.isAuthData(data.data)) {
        let authData = data.data;
        setUser(authData)
        setChallenge(User.Challenges.newData())
        Alert.success("Authenticated with credentials for: " + authData.User.Email)
      }
    }
  }, [signInResponse])

  function beginPassReset() {
    const beginForgotPassChallenge = Challenges.newData();
    beginForgotPassChallenge.ChallengeName = Challenges.Types.BeginForgotPassword;
    setEmail('');
    setChallenge(beginForgotPassChallenge);
  }

  useEffect(function handleChallengeResult() {
    if (challenge.ChallengeName === User.Challenges.Types.Default && API.hasActiveAuth()) {
      navigate && navigate('/home');
    }
  }, [challenge, setChallenge, user, navigate])


  let loginFields;
  let challengeProps = { setChallenge, setErr }

  if (challenge.ChallengeName === Challenges.Types.Default) {
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
              Stay Logged In?  Uncheck if you're using a shared computer.
            </label>
          </div>
        </div>
        <div className="row mt-4">
          <div className='col' style={{textAlign: 'left'}}>
            <p>Don't have an account yet? <a href="/signup">Sign Up</a></p>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button disabled={signInResponse.isLoading} onClick={makeSignInRequest}>Log In</Button>
              <Button onClick={beginPassReset} style='standard' theme='outlineBlue'>Forgot Password?</Button>
              <ErrorBox errMsg={err}></ErrorBox>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    loginFields = (
      <ChallengeBox setUser={setUser}
        user={user}
        setEmail={setEmail}
        email={email}
        API={API}
        challenge={challenge}
        {...challengeProps} />
    )
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
