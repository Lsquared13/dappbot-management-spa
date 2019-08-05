


import {CardElement, injectStripe} from 'react-stripe-elements';

export const stripe = Stripe(process.env.REACT_APP_PAYMENT_ENDPOIN as string)


  