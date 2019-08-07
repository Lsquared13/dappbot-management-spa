import React, { FC, useState, ReactElement } from 'react';
import { ICard as CardType, subscriptions } from 'stripe';
import { useResource } from 'react-request-hook';
import { XOR } from 'ts-xor';
import moment from 'moment';
import { LayoutContainer, InputGroup, InputTitle, InputContainer } from '../layout';
import CreditCard from './CreditCard';
import 'react-credit-cards/lib/styles.scss';
import API from '../services/api';
import Alert from 'react-s-alert';
import { 
  CardElement as NewCardElement,
  ReactStripeElements as RSE,
  injectStripe
} from 'react-stripe-elements';
import { Box, Text, Button } from './ui';

interface EasyInputGroupProps {
  title:string
  children:ReactElement
}
const EasyInputGroup:FC<EasyInputGroupProps> = ({ title, children }) => (
  <InputGroup>
    <InputTitle color="gray">{title}</InputTitle>
    <InputContainer>
      <Box column={12} mdColumn={8}>
        {children}
      </Box>
    </InputContainer>
    {/* TODO: Add an update button within here*/}
  </InputGroup>
)

export interface BillingProps extends RSE.InjectedStripeProps {
  source: XOR<CardType, null>
  subscription: XOR<subscriptions.ISubscription, null>
  name: string
  submitWithToken:(token:stripe.Token)=>Promise<any>
  loadingData: boolean
}

const Billing:FC<BillingProps> = ({ 
  source, subscription, stripe, name, submitWithToken, loadingData
}) => {

  const [updatingCard, setUpdatingCard] = useState(false);
  function toggleUpdatingCard() { setUpdatingCard(!updatingCard) }
  let cardElt = <Text>Loading...</Text>
  if (updatingCard) {
    cardElt = <NewCardElement />
  } else if (source) {
    cardElt = <CreditCard card={source} />
  } else if (!loadingData) {
    cardElt = <Text>No Card on File</Text>
  }

  async function submitCardUpdate(){
    if (!stripe) {
      throw new Error("Billing component loaded without injectStripe; Billing always needs stripe.");
    }
    const { token } = await stripe.createToken({'name' : name })
    if (token && token.id) {
      submitWithToken(token)
    } else {
      Alert.error("Stripe was not able to save these credit card details.");
    }
  }

  let nextBillingDate, subscriptionStatus = 'Loading...';
  if (subscription) {
    // Format is like 'January 1st, 2019'
    nextBillingDate = moment(subscription.current_period_end).format('MMMM Do, YYYY');

    subscriptionStatus = 
      subscription.status === 'trialing' ? 'Trial' :
      subscription.status === 'active' ? 'Active' :
      subscription.status === 'canceled' ? 'Cancelled' :
      'Lapsed';
  }

  
  return (
    <LayoutContainer>
      <EasyInputGroup title='Credit Card'>
        <>
        { cardElt }
        {
          updatingCard ? (
            <>
              <Button onClick={toggleUpdatingCard}>Cancel</Button>
              <Button onClick={submitCardUpdate}>Submit</Button>
            </>
          ) : (
            <Button onClick={toggleUpdatingCard} disabled={loadingData}>
              Update
            </Button>
          )
        }
        </>
      </EasyInputGroup>
      <EasyInputGroup title='Subscription Status'>
        <Text>
          {subscriptionStatus}
        </Text>
      </EasyInputGroup>
      <EasyInputGroup title='Next Billing Date'>
        <Text>
          {nextBillingDate}
        </Text>
      </EasyInputGroup>

      {/* TODO: List the current number of subs */}

    </LayoutContainer>
  )
}

export default injectStripe(Billing);