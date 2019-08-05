import React, { FC, useState, useEffect } from 'react';
import { RouteComponentProps, Link } from '@reach/router';
import { StringField, NumberField, Uints } from '../components/fields';
import { Button, Box, Text } from '../components/ui';

import { CardElement, injectStripe, ReactStripeElements } from 'react-stripe-elements';
import request from 'request-promise-native';
import validate from 'validator';
import API from '../services/api';
import Alert from 'react-s-alert';

import '../components/froala/bootstrap.min.css';
import '../components/froala/froala_blocks.min.css';
import { ErrorBox } from '../components';
import { useResource } from 'react-request-hook';
import { UserCreateArgs } from '../types';

interface PaymentProps extends RouteComponentProps, ReactStripeElements.InjectedStripeProps {
  user?: any
  setUser: (newUser:any)=>void
  API: API
}

export const PLAN_PRICES = {
  ENTHUSIAST : 10,
  PROJECT : 100,
  STARTUP : 150
}

export const CheckoutBox:FC<{numDapps:string}> = ({numDapps}) => {
  const priceTag = parseInt(numDapps) * PLAN_PRICES.PROJECT;
  return (
    <Box>
      <Text>
        You are purchasing <strong>{numDapps} dapps</strong> on our <strong>Project Plan</strong>, at a cost of <strong>${priceTag} per month</strong>.
      </Text>
    </Box>
  )
}


export const Payment:FC<PaymentProps> = ({user, setUser, API, stripe}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [coupon, setCoupon] = useState('');
  const [numDapps, setNumDapps] = useState('0');
  const [addon1, setAddon1] = useState(false)
  const [addon2, setAddon2] = useState(false)
  const [addon3, setAddon3] = useState(false)
  
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);

  const [createUserResponse, sendCreateUserRequest] = useResource(API.payment.createUser());
  const [createUserSent, markCreateUserSent] = useState(false);
  const handleCreateUser= async (args:UserCreateArgs) => {
    markCreateUserSent(true);
    setErr('');
    try {
      sendCreateUserRequest(args);
    } catch (err) {
      Alert.error(`Error sending new user request : ${err.toString()}`)
    }
  }
  useEffect(() => {
    if (!createUserSent) return
    if (createUserResponse.isLoading){
      setLoading(true);
      Alert.info("Sending Request", { timeout: 750});  
    } 
    else if (createUserResponse.error) {
      markCreateUserSent(false)
      setLoading(false);
      setErr(createUserResponse.error.message);
      Alert.error("Error creating new user:"+createUserResponse.error.message);
    } 
    else if(createUserResponse.data) {
      console.log(createUserResponse.data)
      setLoading(false);
      setSuccessful(true);
      markCreateUserSent(false);
    }
  }, [createUserResponse]);
  
  // export interface UserCreateArgs {
  //   email : string
  //   name : string
  //   plans : StripePlans
  //   coupon?: string
  //   token?: string
  // }
  const createSubscription = async () => {
    if (stripe){
      let {token} = await stripe.createToken({name: "Name"});
      if (token) {
        handleCreateUser({ token:token.id, "plans":{standard:1, professional:0, enterprise:0}, "email":email, "name":name, "coupon":coupon})
      }
    }
  }

  return successful ? (
    <div>
      <h2>Congratulations!</h2>
      <Text>
        You've successfully purchased {numDapps} slots on Dappsmith.
        We've sent you an email with your temporary 
        password, <Link to='/login'>login here</Link>.
      </Text>
    </div>
  ) : (
    <div>

      <section className="fdb-block fp-active" data-block-type="forms">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-7 col-md-5 text-center">
              <div className="fdb-box fdb-touch">
                <div className="row">
                  <div className="col">
                    <h2>Get Started with DappBot</h2>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col">
                    <StringField name='name' 
                    value={name} 
                    disabled={loading}
                    displayName='Name'
                    onChange={setName}/>
                  </div>
                </div>
                
                <div className="row mt-4">
                  <div className="col">
                    <StringField name='email' 
                    value={email} 
                    isValid={validate.isEmail}
                    disabled={loading}
                    displayName='Email'
                    onChange={setEmail}/>
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col">
                    <NumberField name='numDapps' 
                    value={numDapps}
                    disabled={loading}
                    size={Uints.size32}
                    displayName='Number of Dapps'
                    onChange={setNumDapps} />
                  </div>
                </div>

                <div className="row-mt-4">
                  <div className="col">
                  <input type={"checkbox"} className="Addon 1" onChange={e=>setAddon1(!addon1)}></input>
                  <input type={"checkbox"} className="Addon 2" onChange={e=>setAddon2(!addon2)}></input>
                  <input type={"checkbox"} className="Addon 3" onChange={e=>setAddon3(!addon3)}></input>
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col">
                    <StringField name='coupon' 
                    onChange={setCoupon}
                    displayName='Coupon'
                    help='If you were given a coupon code for discounted dapps, please enter it here.'
                    value={coupon} />
                    {/* <p className="text-right">Already have an account? <a href="/login">Log In</a></p> */}
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col">
                    <div style={{textAlign: "left"}}>
                      <p className="input-group-header" >Payment</p>
                    </div>
                    <div style={{border: "1px solid #8e8e8e", borderRadius: 4, padding: 20}}>
                      <CardElement />
                    </div>
                  </div>
                </div>


                <div className="row mt-4 mb-4">
                  <div className="col">
                    <CheckoutBox numDapps={numDapps} />
                  </div>
                </div>

                <Button disabled={loading} onClick={createSubscription} block>
                  Submit
                </Button>

              </div>
            </div>
          </div>
        </div>
      </section>

      <ErrorBox errMsg={err} />
    </div>
  )
}

export const PaymentPage = injectStripe(Payment);

export default PaymentPage;