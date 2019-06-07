import React, { FC, useState } from 'react';
import { RouteComponentProps, Link } from '@reach/router';
import { StringField, NumberField, Uints } from '../components/fields';
import { Button, Box, Text } from '../components/ui';

import { CardElement, injectStripe, ReactStripeElements } from 'react-stripe-elements';
import request from 'request-promise-native';
import validate from 'validator';

import '../components/froala/bootstrap.min.css';
import '../components/froala/froala_blocks.min.css';
import { ErrorBox } from '../components';

interface PaymentProps extends RouteComponentProps, ReactStripeElements.InjectedStripeProps {
  user?: any
  setUser: (newUser:any)=>void
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

export const Payment:FC<PaymentProps> = (props) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [coupon, setCoupon] = useState('');
  const [numDapps, setNumDapps] = useState('0');
  
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const createSubscription = async () => {
    if (props.stripe && process.env.REACT_APP_PAYMENT_ENDPOINT){
      setLoading(true);
      setErr('');
      const token = await props.stripe.createToken({name});
      const lambdaRes = await request.post(process.env.REACT_APP_PAYMENT_ENDPOINT, {
        json: true,
        body: { token, email, name, coupon }
      })
      // console.log('Response from lambda fxn: ',lambdaRes);
      if (lambdaRes.customerId) {
        // Tell the user that they'll be receiving a
        // temporary password in just a moment
        setSuccessful(true);
      } else {
        setErr(lambdaRes.err);
      }
      setLoading(false);
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