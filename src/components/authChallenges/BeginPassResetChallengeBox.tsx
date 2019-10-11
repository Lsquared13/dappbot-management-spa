import BaseChallengeBox, { ChallengeBoxInput } from './BaseChallengeBox';

import DappbotAPI from '@eximchain/dappbot-api-client';
import User, { Challenges } from '@eximchain/dappbot-types/spec/user';
import { BeginPassReset } from '@eximchain/dappbot-types/spec/methods/auth';

import React, { FC, useState, useEffect } from 'react';
import Alert from 'react-s-alert';
import { useResource } from 'react-request-hook';

import isEmail from 'validator/lib/isEmail';

interface BeginPassResetChallengeBoxProps {
  API: DappbotAPI
  email: string
  setEmail: (email:string)=>void
  setChallenge: (challenge:Challenges.Data)=>void
}


export const BeginPassResetChallengeBox:FC<BeginPassResetChallengeBoxProps> = ({ API, email, setEmail, setChallenge })=>{
  const [err, setErr] = useState('');

  const [passResetResponse, requestPassReset] = useResource(API.auth.beginPasswordReset.resource);

  function makePassResetRequest() {
    const forgottenPassDetails: BeginPassReset.Args = {
      'username': email
    }
    requestPassReset(forgottenPassDetails)
  }
  const { isLoading, error, data } = passResetResponse;
  useEffect(function handlePassResetResult() {
    if (isLoading) {
      Alert.info("Attempting password reset", { timeout: 1750 })
    }
    else if (error) {
      console.log(error)
      let userMsg;
      switch (error.code) {
        case '401': {
          userMsg = "Authorization failure when resetting your password.";
          break;
        }
        default: {
          userMsg = "Failed to reset password, check the username field and make sure it is a valid email address";
        }
      }
      setErr(userMsg);
      Alert.error(userMsg);
    }
    else if (data && data.data) {
      let forgotPassChallenge = User.Challenges.newData();
      forgotPassChallenge.ChallengeName = User.Challenges.Types.ForgotPassword;
      setChallenge(forgotPassChallenge)
    }
  }, [passResetResponse])

  const submitDisabled = isLoading || !isEmail(email);

  return (
    <BaseChallengeBox title='Reset Forgotten Password'
      errorMsg={err}
      onClick={makePassResetRequest}
      disabled={submitDisabled} >
        <ChallengeBoxInput
          value={email}
          displayName='Email Address'
          fieldType='email'
          disabled={isLoading}
          isValid={isEmail}
          help="The email address for your account. We will send a password reset code to this email."
          errorMsg="This field must be a valid email address."
          onChange={setEmail}
          onPressEnter={submitDisabled ? undefined : makePassResetRequest}
          name='beginResetPassword' />
    </BaseChallengeBox>
  )
}

export default BeginPassResetChallengeBox;