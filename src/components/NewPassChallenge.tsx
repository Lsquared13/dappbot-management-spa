import React, { FC, useState, useEffect } from 'react';
import { Button } from '../components/ui';
import { UserResponseData, ChallengeData, ChallengeType } from '../types'
import { StringField } from '../components/fields';
import API, { challengeDataFactory } from '../services/api';
import {passwordChecker, NewPasswordArgs} from '../services/api/auth';
import Alert from 'react-s-alert';

import { ErrorBox } from '.';
import { useResource } from 'react-request-hook';


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
  const [loading, setLoading] = useState(false);
  const [newPassResponse, requestNewPass] = useResource(API.auth.newPassword())
  //Response Handler
  const [newPassSent, markNewPassSent] = useState(false)

  const handleNewPassword = () => {
    const newPassDetails:NewPasswordArgs = {
      'username': user.User.Username,
      'newPassword': newPass,
      'session': challenge.Session
    }
    markNewPassSent(true)
    requestNewPass(newPassDetails, 'login')
  }
  
  useEffect(()=>{
    if (!newPassSent || newPassResponse.isLoading){
      return;
    }
    if(newPassResponse.error){
      setErr(newPassResponse.error.message)
      Alert.error(`There was an error setting a password: ${newPassResponse.error.message}`)
    }
    let response:any = newPassResponse.data
    // console.log(response.data)
    if(response.data.Authorization){
      const newPassData:UserResponseData = response.data;
      setUser(newPassData);
      setChallenge(challengeDataFactory(ChallengeType.Default))
    }
  }, [newPassSent, newPassResponse])

  return (
    <>
      <section className="fdb-block fp-active" data-block-type="forms">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-7 col-md-5 text-center">
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
                      disabled={loading}
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
                      disabled={loading}
                      isValid={(val)=>passwordChecker.validate(val)}
                      help="Must match field above."
                      errorMsg="Make sure this matches the field above."
                      onChange={setConfirmPass}
                      name='confirmPassword' />
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col">
                    <div style={{textAlign: "left"}}>
                      <Button onClick={handleNewPassword} disabled={loading}>Submit</Button>
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