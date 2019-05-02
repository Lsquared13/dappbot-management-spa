import React, { FC, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { StringField } from '../components/fields';
import {Elements, CardElement } from 'react-stripe-elements';

interface PaymentProps extends RouteComponentProps {

}

export const Payment:FC<PaymentProps> = (props) => {
  const [email, setEmail] = useState('');
  return (
    <section>
      <Elements>

      </Elements>
    </section>
  );
}

export default Payment;