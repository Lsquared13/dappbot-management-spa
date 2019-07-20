import React, { FC, useState, useEffect } from 'react';
import { Button } from '../components/ui';

import { StringField } from '../components/fields';
import Auth, {passwordChecker} from '../services/auth';
import { CognitoUser } from '@aws-amplify/auth';
import { ErrorBox } from '.';
import { useResource } from 'react-request-hook';


interface NewPassChallengeProps {
  user : any
  setChallenge : (challenge:string)=>void
  setErr: (err:string)=>void
  setUser: (user:any)=>void
}

export const NewPassChallenge:FC<NewPassChallengeProps> = ({setChallenge, user, setUser})=>{
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const [newPassResponse, requestNewPass] = useResource(Auth.newPassword())
  //Response Handler
  const [newPassSent, markNewPassSent] = useState(false)
  const handleNewPassword = (email: string, newPassword: string, session: string) => {
    const newPassDetails = {
      'username': email,
      'password': newPassword,
      'session': session
    }
    markNewPassSent(true)
    console.log('sending sign in request', requestNewPass(newPassDetails, 'login'))
  }
  useEffect(()=>{
    if( newPassSent){
      if(newPassResponse.data){
        let response: any = newPassResponse.data
        if(response.data.AuthToken){
          let currentSessionUser = {
            user:{
              signInUserSession:{
                AuthToken:response.data.AuthToken
              }
            }
          }
          setUser(currentSessionUser)
          setChallenge('')
        }
      }
    }


  }, [newPassSent, newPassResponse])
  // const sendNewPass = async () => {
  //   if (newPass !== confirmPass){
  //     setErr('The confirmation password does not match.');
  //     return false;
  //   }
  //   setLoading(true);
  //   try {
  //     const fullUser = await Auth.newPassword(user, newPass);
  //     setUser(fullUser);
  //     setChallenge('');
  //   } catch (e) {
  //     setErr(e.toString())
  //   }
  //   setLoading(false);
  // }
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
                      <Button onClick={handleNewPassword=>(user.getSignInUserSession.idToken.jwtToken, user.username, confirmPass )} disabled={loading}>Submit</Button>
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