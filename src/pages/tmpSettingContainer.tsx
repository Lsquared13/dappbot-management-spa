import React, { FC, useState, useEffect } from "react";
import { RouteComponentProps } from "@reach/router";
import Alert from 'react-s-alert';
import { Container, Breadcrumb, Title, LayoutContainer } from "../layout";
import { Box } from "../components/ui";
import Profile, { ProfileState } from "../layout/Profile";
import { PasswordState } from "../layout/Password";
import {
  SubscriptionPlan,
  SubscriptionDetail,
  SubscriptionChanges
} from "../layout/OldBilling";
import Billing from '../components/Billing';
import { UserResponseData } from "../types";
import { injectStripe, ReactStripeElements as RSE } from "react-stripe-elements";
import API, { StripeUserData } from "../services/api";
import { useResource } from "react-request-hook";
import { ICard, subscriptions } from "stripe";
import { XOR } from "ts-xor";

function sleep(seconds:number){
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  })
}

export interface SettingsContainerProps extends RouteComponentProps, RSE.InjectedStripeProps {
  user : UserResponseData;
  setUser : (user:UserResponseData)=>void
  API : API;
  /* Profile tab props */
  onProfileInputChange?: (inputs: ProfileState) => void;
  onProfileDelete: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    inputs: ProfileState
  ) => void;
  onProfileSave: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    inputs: ProfileState
  ) => void;

  /* Password tab props */
  onPasswordSave: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    inputs: PasswordState
  ) => void;
  onPasswordInputChange?: (inputs: PasswordState) => void;

  /* Billing tab props */
  subscriptionPlan: SubscriptionPlan;
  onCancelSubscription?: () => void;
  onCreateSubscription?: (newPlan: SubscriptionDetail) => void;
  onPurchaseDapps?: () => void;
  onViewPastInvoice?: () => void;
  onRenewSubscription?: (renewPlan: SubscriptionDetail) => void;
  onSave?: (subscriptionDetail: SubscriptionChanges) => void;
  onUpdateSubscription?: (subscriptionPlan: SubscriptionDetail) => void;
}

export interface SettingState {
  activeIndex: number;
  activeTab: string;
}

// TODO: This page is going to contain the full
// Settings content for now, both the email and
// billing info.  As such, this code related to
// switching tabs is dead for now.  Keeping it
// as a reminder.
//
// const [activeTab, setActiveTab] = useState('Profile');
// const [activeIndex, setActiveIndex] = useState(0);
// function handleChange({ activeTabIndex, event }:any){
//   event.preventDefault();
//   setActiveTab('Profile');
//   setActiveIndex(activeTabIndex)
// }

// Explicitly not exporting raw component because
// it needs to be run with the injectStripe HOC
// on the default object.
const SettingContainer:FC<SettingsContainerProps> = (props) => {
  const { API, user, setUser } = props;
  let [hasStripe, setHasStripe] = useState(false);
  let [source, setSource] = useState(null as XOR<ICard, null>);
  let [subscription, setSubscription] = useState(null as XOR<subscriptions.ISubscription, null>);
  let [name, setName] = useState('Loading...');
  const [stripeData, fetchStripeData] = useResource(API.payment.getUserStripeData(), []);
  useEffect(function handleStripeDataLoad(){
    let { data, error } = stripeData;
    if (data) console.log('data: ',data);
    if (data){
      // @ts-ignore Resource Factory expects responses to all
      // have the data object nesting, payment lambda doesn't.
      // Ignore this until that's updated.
      const userData:StripeUserData = data;
      const newUser = userData.user;
      const { customer, subscription } = userData;
      if (customer){
        setSource(customer.default_source as XOR<ICard, null>);
        setName(customer.name || '');
        setHasStripe(true);
      } else {
        setHasStripe(false);
        Alert.info('No Stripe customer found!');
      }
      if (subscription) setSubscription(subscription);
      setUser({
        ...user,
        User : newUser
      });
    } else if (error) {
      console.log('error fetching data: ',error);
      Alert.error(`Error fetching your subscription data: ${error.toString()}`)
    }
  }, [stripeData]);


  const [updatePaymentResponse, updatePaymentRequest] = useResource(API.payment.updatePaymentMethod());
  async function sendUpdatePayment(token:stripe.Token){
    await API.refreshAuthorization();
    updatePaymentRequest({ token : token.id });
  }
  useEffect(function handleUpdatedPayment(){
    let { isLoading, data, error } = updatePaymentResponse;
    if (error) {
      Alert.error(`Error updating your card: ${error.message}`)
    } else if (data && !isLoading) {
      fetchStripeData();
      sleep(5).then(() => {
        // Payment status may take a few seconds to propagate,
        // this sleep gives the infra a moment to do its magic.
        API.refreshUser();
      })
    }
    if (data) console.log('updatedPaymentResponse: ',data);
  }, [updatePaymentResponse, fetchStripeData]);
  
  return (
    <Box>
      <Breadcrumb title={"none"} />

      <Title title={'Profile'} />
      <Container>
        <Box>
          <LayoutContainer>
            <Profile {...props} />
            <Billing source={source} 
              subscription={subscription} 
              name={name}
              hasStripe={hasStripe}
              loadingData={stripeData.isLoading}
              submitWithToken={sendUpdatePayment} />
          </LayoutContainer>
        </Box>
      </Container>
    </Box>
  );
}

export default injectStripe(SettingContainer);