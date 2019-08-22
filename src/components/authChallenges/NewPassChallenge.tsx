import React, { FC, useState, useEffect } from 'react';
import { Button } from '../ui';
import { UserResponseData, ChallengeData, ChallengeType } from '../../types'
import { StringField } from '../fields';
import API, { challengeDataFactory } from '../../services/api';
import {passwordChecker, NewPasswordArgs} from '../../services/api/auth';
import Alert from 'react-s-alert';

import { ErrorBox } from '..';
import { useResource } from 'react-request-hook';
import { getErrMsg } from '../../services/util';


interface NewPassChallengeProps {
  user : UserResponseData,
  challenge: ChallengeData,
  setChallenge : (challenge: ChallengeData)=>void
  setErr: (err:string)=>void
  setUser: (user:UserResponseData)=>void
  API: API
}

export const NewPassChallenge:FC<NewPassChallengeProps> = ({challenge, setChallenge, user, setUser, API})=>{
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [err, setErr] = useState('');

  const [newPassResponse, requestNewPass] = useResource(API.auth.newPassword())
  const makeNewPassRequest = async () => {
    const newPassDetails:NewPasswordArgs = {
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
    if(data && data.Authorization){
      setUser(data);
      setChallenge(challengeDataFactory(ChallengeType.Default))
    }
  }, [error, data])

  return (
    <>
      <section className="fdb-block fp-active pt-0" data-block-type="forms" >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-8 text-center">
              <div className="fdb-box fdb-touch">
                <div className="row">
                  <div className="col">
                    <h2>Set a new password</h2>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col">
                    {/* <input type="text" className="form-control" placeholder="Email" /> */}
                    <StringField 
                      value={newPass}
                      displayName='New Password'
                      fieldType='password'
                      disabled={isLoading}
                      isValid={(val)=>passwordChecker.validate(val)}
                      help="Minimum of 8 characters; include upper and lowercase letters, numbers, and a symbol."
                      errorMsg="Passwords must be at least 8 characters long, including upper and lowercase letters, a number, and a symbol."
                      onChange={setNewPass}
                      name='newPassword' /> 
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col">
                    {/* <input type="password" className="form-control mb-1" placeholder="Password" /> */}
                    <StringField 
                      value={confirmPass}
                      displayName='Confirm New Password'
                      fieldType='password'
                      disabled={isLoading}
                      isValid={(val)=>passwordChecker.validate(val)}
                      help="Must match field above."
                      errorMsg="Make sure this matches the field above."
                      onChange={setConfirmPass}
                      onPressEnter={makeNewPassRequest}
                      name='confirmPassword' />
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col">
                    <div style={{textAlign: "left"}}>
                      <Button onClick={makeNewPassRequest} disabled={isLoading}>Submit</Button>
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
}

export default NewPassChallenge;