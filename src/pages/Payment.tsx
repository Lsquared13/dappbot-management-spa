import React, { FC, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { StringField, NumberField, Uints } from '../components/fields';
import { Button } from '../components/ui';
import {Elements, CardElement, injectStripe, ReactStripeElements } from 'react-stripe-elements';
import request from 'request-promise-native';

interface PaymentProps extends RouteComponentProps, ReactStripeElements.InjectedStripeProps {

}

export const Payment:FC<PaymentProps> = (props) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [numDapps, setNumDapps] = useState('0');
  
  const [loading, setLoading] = useState(false);
  const createSubscription = async () => {
    if (props.stripe && process.env.REACT_APP_PAYMENT_ENDPOINT){
      setLoading(true);
      const token = await props.stripe.createToken({name});
      const lambdaRes = await request.post(process.env.REACT_APP_PAYMENT_ENDPOINT, {
        json: true,
        body: { token, email, name }
      })
      console.log('Response from lambda fxn: ',lambdaRes);
    }
  }

  return (
    <section>
      <Elements>
        <StringField name='name' 
          value={name} 
          disabled={loading}
          displayName='Name'
          onChange={setName}/>
        <StringField name='email' 
          value={email} 
          disabled={loading}
          displayName='Email'
          onChange={setEmail}/>
        <NumberField name='numDapps' 
          value={numDapps}
          disabled={loading}
          size={Uints.size32}
          onChange={setNumDapps} />
        <CardElement />
        <Button disabled={loading} onClick={createSubscription} block>
          Submit
        </Button>
      </Elements>
    </section>
  );
}

export const PaymentPage = injectStripe(Payment);

export default PaymentPage;