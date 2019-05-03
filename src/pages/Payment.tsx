import React, { FC, useState } from 'react';
import { RouteComponentProps, Link } from '@reach/router';
import { StringField, NumberField, Uints } from '../components/fields';
import { Button, Box, Text } from '../components/ui';
import { ErrorBox } from '../components';
import { CardElement, injectStripe, ReactStripeElements } from 'react-stripe-elements';
import request from 'request-promise-native';
import validate from 'validator';

interface PaymentProps extends RouteComponentProps, ReactStripeElements.InjectedStripeProps {

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
        You are purchasing <strong>{numDapps} dapps</strong> on our
        <strong>Project Plan</strong>, at a cost of <strong>${priceTag} per month</strong>.
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
      console.log('Response from lambda fxn: ',lambdaRes);
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
    <section>
      <h2>Congratulations!</h2>
      <Text>
        You've successfully purchased {numDapps} slots on Dappsmith.
        We've sent you an email with your temporary 
        password, <Link to='/login'>login here</Link>.
      </Text>
    </section>
  ) : (
    <section>
      <StringField name='name' 
        value={name} 
        disabled={loading}
        displayName='Name'
        onChange={setName}/>
      <StringField name='email' 
        value={email} 
        isValid={validate.isEmail}
        disabled={loading}
        displayName='Email'
        onChange={setEmail}/>
      <NumberField name='numDapps' 
        value={numDapps}
        disabled={loading}
        size={Uints.size32}
        displayName='Number of Dapps'
        onChange={setNumDapps} />
      <StringField name='coupon' 
        onChange={setCoupon}
        displayName='Coupon'
        help='If you were given a coupon code for discounted dapps, please enter it here.'
        value={coupon} />
      <CardElement />
      <CheckoutBox numDapps={numDapps} />
      <Button disabled={loading} onClick={createSubscription} block>
        Submit
      </Button>
      <ErrorBox errMsg={err} />
    </section>
  )
}

export const PaymentPage = injectStripe(Payment);

export default PaymentPage;