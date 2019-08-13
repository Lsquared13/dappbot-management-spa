import React, { FC, useState, ReactElement } from 'react';
import { ICard as CardType, subscriptions } from 'stripe';
import { useResource } from 'react-request-hook';
import { XOR } from 'ts-xor';
import moment from 'moment';
import { LayoutContainer, InputGroup, InputTitle, InputContainer } from '../layout';
import CreditCard from './CreditCard';
import 'react-credit-cards/lib/styles.scss';
import Alert from 'react-s-alert';
import { NumberField, Uints} from '../components/fields';
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
  </InputGroup>
)

export interface BillingProps extends RSE.InjectedStripeProps {
  hasStripe: boolean
  source: XOR<CardType, null>
  subscription: XOR<subscriptions.ISubscription, null>
  name: string
  submitWithToken:(token:stripe.Token)=>Promise<any>
  loadingData: boolean
  totalNumDapps: number
  submitUpdateDapps:(numDapps:number) => Promise<any>
  availableNumDapps: number
}

const Billing:FC<BillingProps> = ({ 
  source, subscription, stripe, name, submitWithToken, 
  loadingData, hasStripe,totalNumDapps: totalNumDapps, submitUpdateDapps, availableNumDapps
}) => {


  const [updatingCard, setUpdatingCard] = useState(false);
  const [updatingNumDapps, setUpdateNumDapps] = useState(false);
  const [numDapps, setNumDapps] = useState(totalNumDapps.toString());
 

  function toggleUpdatingCard() { setUpdatingCard(!updatingCard) }
  function toggleUpdatingNumDapps() {setUpdateNumDapps(!updatingNumDapps)}
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

  let numDappsElement = <Text>Loading...</Text>
  if(updatingNumDapps) {
    numDappsElement = 
      <NumberField name='numDapps' 
      value={numDapps}
      displayName={'Number of Dapps'}
      size={Uints.size32}
      onChange={setNumDapps} />
      
  }else {
    numDappsElement =<Text> {numDapps} </Text>
  }
  function resetNumDapps() {
    setNumDapps(totalNumDapps.toString())      
  }
  async function submitDappSubscriptionUpdate(){
    const updateNumber = parseInt(numDapps)
    if(updateNumber<0){
      Alert.info("You cannot update the number of dapps to a negative amount")
      resetNumDapps()
    } else if(updateNumber!==totalNumDapps){
      if((updateNumber < totalNumDapps) && (availableNumDapps < totalNumDapps-updateNumber)){
        resetNumDapps()
        Alert.error("Please delete a dapp if you want to update your subscription to a lower number of dapps")
      }else{
        console.log(updateNumber)
        console.log(availableNumDapps)
        console.log(totalNumDapps)
        submitUpdateDapps(updateNumber)
        Alert.info("Updating your subscription, this may take a moment.")
      }
      toggleUpdatingNumDapps();
    } else{
        Alert.error("You cannot update the number of dapps to the same amount")
    }
  }
  async function submitCardUpdate(){
    if (!stripe) {
      throw new Error("Billing component loaded without injectStripe; Billing always needs stripe.");
    }
    const { token } = await stripe.createToken({'name' : name })
    if (token && token.id) {
      submitWithToken(token)
      Alert.info("Securely updating your new credit card with Stripe, this may take a moment...");
      toggleUpdatingCard();
    } else {
      Alert.error("Stripe was not able to save these credit card details.");
    }
  }

  let nextBillingDate, subscriptionStatus = 'Loading...';
  if (subscription) {
    // Format is like 'January 1st, 2019', API comes in seconds
    nextBillingDate = moment(subscription.current_period_end * 1000).format('MMMM Do, YYYY');

    subscriptionStatus = 
      subscription.status === 'trialing' ? 'Trial' :
      subscription.status === 'active' ? 'Active' :
      subscription.status === 'canceled' ? 'Cancelled' :
      'Lapsed';
  } else if (!loadingData && !hasStripe) {
    subscriptionStatus = 'N/A'
    nextBillingDate = 'N/A'
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
  return (
    <>
      <EasyInputGroup title='Credit Card'>
        <>
        { cardElt }
        { updateCardBtns }
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
      <EasyInputGroup title='Update number of Dapps'>
        <>
        {numDappsElement}
        {
          updatingNumDapps ? (
            <Button onClick={submitDappSubscriptionUpdate} block>
              Submit
            </Button>
          ):
          <Button onClick={toggleUpdatingNumDapps}
            size='small' 
            style='quiet'
            theme='outlineBlue'>
            Update
          </Button>
        }
        </>
      </EasyInputGroup>
      
      {/* TODO: List the current number of subs */}

    </>
  )
}

export default injectStripe(Billing);