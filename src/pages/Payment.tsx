import React, { FC, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { StringField, NumberField, Uints, NumberTypeStrings } from '../components/fields';
import { Button } from '../components/ui';
import {Elements, CardElement, injectStripe, ReactStripeElements } from 'react-stripe-elements';

interface PaymentProps extends RouteComponentProps, ReactStripeElements.InjectedStripeProps {

}

export const Payment:FC<PaymentProps> = (props) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [numDapps, setNumDapps] = useState('0');
  
  const createSubscription = async () => {
    if (props.stripe){
      const token = props.stripe.createToken({name});

    }
  }

  return (
    <section>
      <Elements>
      <StringField name='name' 
          value={name} 
          displayName='Name'
          onChange={setName}/>
        <StringField name='email' 
          value={email} 
          displayName='Email'
          onChange={setEmail}/>
        <NumberField name='numDapps' 
          value={numDapps}
          size={Uints.size32}
          onChange={setNumDapps} />
        <CardElement />
        <Button></Button>
      </Elements>
    </section>
  );
}

export const PaymentPage = injectStripe(Payment);

export default PaymentPage;