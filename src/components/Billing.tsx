import React, { FC, useState, ReactElement } from 'react';
import { ICard as CardType, subscriptions } from 'stripe';
import { confirmAlert } from 'react-confirm-alert';
import {
  CardElement as NewCardElement,
  ReactStripeElements as RSE,
  injectStripe
} from 'react-stripe-elements';
import { XOR } from 'ts-xor';
import moment from 'moment';
import Alert from 'react-s-alert';
import { LayoutContainer, InputGroup, InputTitle, InputContainer } from '../layout';
import CreditCard from './CreditCard';
import 'react-credit-cards/lib/styles.scss';
import CustomConfirmFactory from './CustomConfirmAlert';
import { NumberField, Uints } from '../components/fields';

import { Box, Text, Button } from './ui';

interface EasyInputGroupProps {
  title: string
  children: ReactElement
}
const EasyInputGroup: FC<EasyInputGroupProps> = ({ title, children }) => (
  <InputGroup>
    <InputTitle color="gray">{title}</InputTitle>
    <InputContainer>
      <Box column={12} mdColumn={8}>
        {children}
      </Box>
    </InputContainer>
  </InputGroup>
)

export interface BillingProps extends RSE.InjectedStripeProps {
  hasStripe: boolean
  source: XOR<CardType, null>
  subscription: XOR<subscriptions.ISubscription, null>
  name: string
  submitWithToken: (token: stripe.Token) => Promise<any>
  loadingData: boolean
  totalNumDapps: number
  submitUpdateDapps: (numDapps: number) => Promise<any>
  usedNumDapps: number
  paymentStatus: string
}

const Billing: FC<BillingProps> = ({
  source, subscription, stripe, name, submitWithToken, paymentStatus,
  loadingData, hasStripe, totalNumDapps, submitUpdateDapps, usedNumDapps
}) => {

  /////////////////////////////////
  // UPDATE CARD
  /////////////////////////////////
  const [updatingCard, setUpdatingCard] = useState(false);
  function toggleUpdatingCard() { setUpdatingCard(!updatingCard) }
  async function submitCardUpdate() {
    if (!stripe) {
      throw new Error("Billing component loaded without injectStripe; Billing always needs stripe.");
    }
    const { token } = await stripe.createToken({ 'name': name })
    if (token && token.id) {
      submitWithToken(token)
      Alert.info("Securely updating your new credit card with Stripe, this may take a moment...");
      toggleUpdatingCard();
    } else {
      Alert.error("Stripe was not able to save these credit card details.");
    }
  }
  let cardElt = <Text>Loading...</Text>
  if (updatingCard) {
    cardElt = <NewCardElement />
  } else if (source) {
    cardElt = <CreditCard card={source} />
  } else if (!loadingData) {
    if (hasStripe) {
      cardElt = <Text>No Card on File</Text>
    } else {
      cardElt = <Text>No Stripe Payment Details</Text>
    }
  }
  let updateCardBtns = null;
  if (hasStripe) {
    updateCardBtns = updatingCard ? (
      <>
        <Button onClick={toggleUpdatingCard}
          size='small'
          style='quiet'
          theme='outlineBlue'>
          Cancel
        </Button>
        <Button onClick={submitCardUpdate}
          size='small'
          style='quiet'
          theme='outlineBlue'>
          Submit
        </Button>
      </>
    ) : (
        <Button onClick={toggleUpdatingCard}
          size='small'
          style='quiet'
          theme='outlineBlue'
          disabled={loadingData}>
          Update
      </Button>
      )
  }

  /////////////////////////////////
  // UPDATE DAPPS
  /////////////////////////////////
  const [updatingNumDapps, setUpdateNumDapps] = useState(false);
  const [numDapps, setNumDapps] = useState(totalNumDapps.toString());
  function toggleUpdatingNumDapps() { setUpdateNumDapps(!updatingNumDapps) }
  async function submitDappSubscriptionUpdate() {
    const updateNumber = parseInt(numDapps)
    if (updateNumber === totalNumDapps) {
      Alert.info("New number of dapps same as the old one, no update required.");
      toggleUpdatingNumDapps();
      return;
    }
    if (updateNumber < usedNumDapps) {
      Alert.error(`You cannot subscribe to fewer dapps than you currently have.  If you would like to subscribe to ${updateNumber} dapps, please delete ${usedNumDapps - updateNumber} of your existing dapps.`)
      return;
    }
    function runUpdate() {
      submitUpdateDapps(updateNumber);
      toggleUpdatingNumDapps();
      Alert.info("Updating your subscription, it may take a moment for the new values to be reflected here.");
    }
    if (!(subscription && subscription.status === 'trialing')) {
      runUpdate();
    } else {
      let billingCost = 10 * parseInt(numDapps);
      confirmAlert({
        customUI: CustomConfirmFactory({
          title: 'Confirm Purchase',
          message: [
            `You are still in your free trial.  If you increase your number of dapps, the trial will end immediately and you will be billed $${billingCost} USD (${numDapps} Standard Dapps at $10 each).`,
            'Would you like to continue?'
          ],
          onConfirm: runUpdate
        })
      })
    }
  }
  let updateDappsElement = <Text>Loading...</Text>
  if (updatingNumDapps) {
    updateDappsElement =
      <NumberField name='numDapps'
        value={numDapps}
        displayName={'Number of Dapps'}
        size={Uints.size32}
        onChange={setNumDapps} />
  } else {
    updateDappsElement = <Text> {totalNumDapps} </Text>
  }
  let noUpdatesAllowed = !source;
  let updateDappsBtn = updatingNumDapps ? (
    <>
      <Button onClick={toggleUpdatingNumDapps}
        size='small'
        style='quiet'
        theme='outlineBlue'>
        Cancel
    </Button>
      <Button onClick={submitDappSubscriptionUpdate} block>
        Submit
    </Button>
    </>
  ) : (
      <Button onClick={toggleUpdatingNumDapps}
        size='small'
        style='quiet'
        disabled={noUpdatesAllowed}
        theme='outlineBlue'>
        Update
  </Button>
    )

  /////////////////////////////////
  // SUBSCRIPTION DETAIL PRESENTATION LOGIC
  /////////////////////////////////
  let nextBillingDate, subscriptionStatus = 'Loading...';
  if (subscription) {
    // Format is like 'January 1st, 2019', API comes in seconds
    nextBillingDate = moment(subscription.current_period_end * 1000).format('MMMM Do, YYYY');
    if (subscription.status === 'trialing') {
      subscriptionStatus = 'Trial';
    } else {
      subscriptionStatus = paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1).toLowerCase();
    }
  } else if (!loadingData && !hasStripe) {
    subscriptionStatus = 'N/A'
    nextBillingDate = 'N/A'
  }

  return (
    <>
      <EasyInputGroup title='Max Number of Dapps'>
        <>
          {updateDappsElement}
          {updateDappsBtn}
          {
            noUpdatesAllowed && !loadingData ? (
              <Text>
                Please plug in payment information to buy more dapp slots.
            </Text>
            ) : null
          }
        </>
      </EasyInputGroup>
      <EasyInputGroup title='Subscription Status'>
        <Text>
          {subscriptionStatus}
        </Text>
      </EasyInputGroup>
      <EasyInputGroup title='Credit Card'>
        <>
          {cardElt}
          {updateCardBtns}
        </>
      </EasyInputGroup>
      <EasyInputGroup title='Next Billing Date'>
        <Text>
          {nextBillingDate}
        </Text>
      </EasyInputGroup>

      {/* TODO: List the current number of subs */}

    </>
  )
}

export default injectStripe(Billing);