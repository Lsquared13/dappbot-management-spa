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
import { InputGroup, InputTitle, InputContainer } from '../layout';
import CreditCard from './CreditCard';
import CustomConfirmFactory from './CustomConfirmAlert';
import { NumberField, Uints } from '../components/fields';
import { Box, Text, Button } from './ui';
import InvoiceTable from './InvoiceTable';
import { Invoice } from '../services/api/types';

interface EasyInputGroupProps {
  title: string
  children: ReactElement
}
const EasyInputGroup: FC<EasyInputGroupProps> = ({ title, children }) => (
  <InputGroup>
    <InputTitle color="gray">{title}</InputTitle>
    <InputContainer>
      <Box column={12} mdColumn={12} width='100%'>
        {children}
      </Box>
    </InputContainer>
  </InputGroup>
)

interface EvenBlocksProps {
  left : ReactElement
  right : ReactElement
}
const EvenBlocks:FC<EvenBlocksProps> = ({ left, right }) => {
  return (
    <Box display='flex'>
      <Box display='flex' flex='grow' alignItems='center' paddingX={1}>
        { left }
      </Box>
      <Box display='flex' flex='grow' alignItems='center' paddingX={1}>
        { right }
      </Box>
    </Box>
  )
}

export interface BillingProps extends RSE.InjectedStripeProps {
  hasStripe: boolean
  source: XOR<CardType, null>
  subscription: XOR<subscriptions.ISubscription, null>
  invoice: XOR<Invoice, null>
  name: string
  email: string
  submitWithToken: (token: stripe.Token) => Promise<any>
  loadingData: boolean
  totalNumDapps: number
  submitUpdateDapps: (numDapps: number) => Promise<any>
  usedNumDapps: number
  paymentStatus: string
}

const Billing: FC<BillingProps> = ({
  source, subscription, stripe, name, submitWithToken, paymentStatus,
  loadingData, hasStripe, totalNumDapps, submitUpdateDapps, usedNumDapps,
  invoice, email
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
    cardElt = (
      <>
      <br />
      <NewCardElement id='stripe-card-form' />
      <br />
      </>
    )
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
      <EvenBlocks
        left={
          <Button onClick={toggleUpdatingCard}
            block
            theme='outlineNeutral'>
            Cancel
          </Button>
        }
        right={
          <Button onClick={submitCardUpdate}
            block
            theme='outlineBlue'>
            Submit
          </Button>
        }
      />
    ) : (
        <Button onClick={toggleUpdatingCard}
          size='small'
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
    if (updateNumber === 0) {
      confirmAlert({
        customUI: CustomConfirmFactory({
          title : 'Cancel Subscription',
          message : [
            'If you do not want any dapp slots, we will cancel your subscription.',
            'All of your dapps will be deleted, letting other people claim their names.  You will still be able to log in and resume your subscription.',
            'Would you like to cancel?'
          ],
          onConfirm : () => {
            // TODO: Implement cancellation handling on the payment-lambda
            Alert.info('Account cancellation is under construction right now; please make a support ticket and we can fully cancel your subscription.', { timeout : 15000})
          }
        })
      })
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
    <EvenBlocks
      left={
        <Button onClick={toggleUpdatingNumDapps}
          block
          theme='outlineNeutral'>
          Cancel
        </Button>
      }
      right={
        <Button onClick={submitDappSubscriptionUpdate} 
          theme='outlineBlue'
          block>
          Submit
        </Button>
      }
    />
  ) : (
      <Button onClick={toggleUpdatingNumDapps}
        size='small'
        theme='outlineBlue'
        disabled={noUpdatesAllowed || loadingData}>
        Update
  </Button>
    )

  /////////////////////////////////
  // SUBSCRIPTION DETAIL PRESENTATION LOGIC
  /////////////////////////////////
  let subscriptionStatus= 'Loading...';
  let invoiceTitle = 'Upcoming Invoice';
  if (subscription) {
    if (['FAILED', 'LAPSED'].includes(paymentStatus)) invoiceTitle = 'Failed Invoice';
    if (subscription.status === 'trialing') {
      subscriptionStatus = 'Trial';
    } else {
      subscriptionStatus = paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1).toLowerCase();
    }
  } else if (!loadingData && !hasStripe) {
    subscriptionStatus = 'N/A'
  }

  return (
    <>
      <EvenBlocks left={
        <div>
        <EasyInputGroup title='Email'>
          <Text>
            {email}
          </Text>
        </EasyInputGroup>
        <EasyInputGroup title='Subscription Status'>
          <Text>
            {subscriptionStatus}
          </Text>
        </EasyInputGroup>
        <EasyInputGroup title='Max Number of Dapps'>
          <>
            {updateDappsElement}
            <br />
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
        </div>
      } right={
        <div className='marginBottom11' style={{
          marginBottom:'22px', width:'100%'
        }}>
          <InputTitle color="gray">Credit Card</InputTitle>
          <div className='marginTop2 marginBottom3'>
            {cardElt}
              <br />
            {updateCardBtns}
          </div>
        </div>
      } />
      <EasyInputGroup title={invoiceTitle}>
        <InvoiceTable invoice={invoice} loadingData={loadingData} />
      </EasyInputGroup>
    </>
  )
}

export default injectStripe(Billing);