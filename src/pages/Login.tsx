import React, { FC, useState, useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';
import isEmail from 'validator/lib/isEmail';
import { Button } from '../components/ui';
import StringField from '../components/fields/StringField';
import Alert from 'react-s-alert';
import { useResource } from 'react-request-hook';
import { UserResponse,
         challengeDataFactory,
         defaultUserResponse,
         ChallengeType } from '../types';


import Auth,{BeginPasswordResetArgs, SignInArgs} from '../services/auth';

import '../components/froala/bootstrap.min.css';
import '../components/froala/froala_blocks.min.css';
import { ErrorBox, NewPassChallenge, MfaChallenge, ForgotPassChallenge } from '../components';
import { CognitoUser } from '@aws-amplify/auth';


export interface LoginProps extends RouteComponentProps {
  setUser: (user: UserResponse) => void
  user: any
}

export const Login: FC<LoginProps> = (props) => {
  const { user, setUser, navigate } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const [challenge, setChallenge] = useState(challengeDataFactory(ChallengeType.Default));
  const [signInResponse, requestSignIn] = useResource(Auth.signIn())
  const [beginPasswordResetResponse, beginPasswordReset] = useResource(Auth.beginPasswordResetRequest())
  //Response Handler
  const [signInSent, markSignInSent] = useState(false)
  const [passwordResetSent, markPasswordResetSent] = useState(false);


  const handleSignIn = (email: string, password: string) => {
    const loginDetails:SignInArgs = {
      'username': email,
      'password': password
    }
    markSignInSent(true)
    requestSignIn(loginDetails, 'login')
  }

  const handleForgottenPass = (email: string) => {
    const forgottenPassDetails:BeginPasswordResetArgs = {
      'username': email
    }
    markPasswordResetSent(true)
    beginPasswordReset(forgottenPassDetails, 'password-reset')

  }
  // const handleForgotPass = async () => {
  //   markResetSent(true);
  //   setErr('')
  //   requestReset({
  //     'username': email
  //   }, 'password-reset')
  //   if (email === "") return;

  //   setLoading(true)
  //   if (email === "") {
  //     throw Error("Invalid Email")
  //   }
  //   const result: any = await Auth.forgotPassword(email)
  //   if (result.errMsg) {
  //     setErr(result.errMsg);
  //   } else {
  //     Alert.info(`We sent an email to reset your password at this email: ${email}`)

  //     setChallenge(forgotPasswordChallengeData)
  //   }
  //   setLoading(false)
  // }

  useEffect(function handlePassResetResult(){
    if(!passwordResetSent || beginPasswordResetResponse.isLoading){
      return
    }
    if (beginPasswordResetResponse.error){
      setErr(beginPasswordResetResponse.error.message);
      markPasswordResetSent(false);
      return;
    }else if (
      beginPasswordResetResponse.data
    ) {
      const result: any = beginPasswordResetResponse.data
      markPasswordResetSent(false)
      setChallenge(challengeDataFactory(ChallengeType.ForgotPassword))
      return
    }
  }, [beginPasswordResetResponse, markPasswordResetSent, passwordResetSent])

  useEffect(function handleChallengeResult() {
    console.log("handling the result", challenge)
    if (challenge.ChallengeName === ChallengeType.Default  && user.Authorization) {
      navigate && navigate('/home');
    }
  }, [challenge, setChallenge, user, navigate])

  // If we now have a Cognito user and no challenge
  // TODO: This probably won't behave right, as CognitoUser
  // can match with an empty object.  Need to determine a good
  // property to check for.
  useEffect(function handleLoginResult() {

    if (!signInSent || signInResponse.isLoading) {
      return;
    }

    if (signInResponse.error) {
      console.log("SignIn Error: ",signInResponse.error);
      setErr(signInResponse.error.message)
      markSignInSent(false);
      Alert.error(`There was an error signing in: ${signInResponse.error.message}`)
      return;
    } else if (signInResponse.data) {
      markSignInSent(false);

      let response: any = signInResponse.data

      if (response.data) {
        let tempUser = defaultUserResponse
        tempUser.User.Username = email
        setUser(tempUser)
        setChallenge(response.data)
      }

      if (response.data.Authorization) {
        const { Authorization, User, Refresh } = response.data;

        setUser({
          User: User,
          Authorization, Refresh
        })
        setChallenge(challengeDataFactory(ChallengeType.Default))
      }
      //TODO: Define the type for the message response
      // @ts-ignore
      Alert.success(`${signInResponse.data.message}`)

      return;
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
            <Button onClick={()=>handleForgottenPass(email)}>Forgot Password?</Button>
            <ErrorBox errMsg={err}></ErrorBox>
          </div>
          {/* <button className="btn btn-primary" type="button">Submit</button> */}
        </div>
      </div>
    </div>
  )
  let challengeProps = { setChallenge, setErr }
  switch (challenge.ChallengeName) {
    case (ChallengeType.NewPasswordRequired):
      loginFields = <NewPassChallenge setUser={setUser} user={user} challenge = {challenge} {...challengeProps} />
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