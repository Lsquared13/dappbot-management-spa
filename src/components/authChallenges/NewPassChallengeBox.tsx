import { ChallengeBoxOuter, ChallengeBoxTitle, ChallengeBoxInput, ChallengeBoxSubmitButton } from './utils';
import { getErrMsg } from '../../services/util';

import DappbotAPI from '@eximchain/dappbot-api-client';
import { isSuccessResponse } from '@eximchain/dappbot-types/spec/responses';
import User, { Challenges, validatePassword } from '@eximchain/dappbot-types/spec/user';
import { NewPassChallenge } from '@eximchain/dappbot-types/spec/methods/auth';

import React, { FC, useState, useEffect } from 'react';
import Alert from 'react-s-alert';
import { useResource } from 'react-request-hook';

export interface NewPassChallengeBoxProps {
    API: DappbotAPI
    user : User.AuthData,
    challenge: Challenges.Data
    setUser: (user:User.AuthData)=>void
    setChallenge: (challenge: Challenges.Data)=>void
}

export const NewPassChallengeBox: FC<NewPassChallengeBoxProps> = ({ API, user, challenge, setUser, setChallenge }) => {
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [err, setErr] = useState('');

  const [newPassResponse, requestNewPass] = useResource(API.auth.newPassword.resource);

  const makeNewPassRequest = async () => {
    const newPassDetails:NewPassChallenge.Args = {
      'username': user.User.Username,
      'newPassword': newPass,
      'session': challenge.Session
    }
    requestNewPass(newPassDetails)
  }
  const { error, data, isLoading } = newPassResponse;
  useEffect(function handleNewPassResponse(){
    if(error){
      switch (error.code) {
        default: {
          let msg = `Error setting new password : ${getErrMsg(error)}`
          setErr(msg)
          Alert.error(msg);
        }
      }
    }
    if(isSuccessResponse(data)){
      if (User.isAuthData(data.data)) setUser(data.data);
      setChallenge(Challenges.newData())
    }
  }, [error, data])

  return (
    <ChallengeBoxOuter>
      <>
        <ChallengeBoxTitle title='Set a new password' />
        <ChallengeBoxInput 
          value={newPass}
          displayName='New Password'
          fieldType='password'
          disabled={isLoading}
          isValid={validatePassword}
          help="Minimum of 8 characters; include upper and lowercase letters, numbers, and a symbol."
          errorMsg="Passwords must be at least 8 characters long, including upper and lowercase letters, a number, and a symbol."
          onChange={setNewPass}
          name='newPassword' /> 
        <ChallengeBoxInput
          value={confirmPass}
          displayName='Confirm New Password'
          fieldType='password'
          disabled={isLoading}
          isValid={validatePassword}
          help="Must match field above."
          errorMsg="Make sure this matches the field above."
          onChange={setConfirmPass}
          onPressEnter={makeNewPassRequest}
          name='confirmPassword' />
        <ChallengeBoxSubmitButton 
          onClick={makeNewPassRequest}
          disabled={isLoading}
          errorMsg={err} />
      </>
    </ChallengeBoxOuter>
  );
}

export default NewPassChallengeBox;