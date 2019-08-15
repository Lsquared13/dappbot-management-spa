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
import { UserResponseData, StripePlans } from "../types";
import { injectStripe, ReactStripeElements as RSE } from "react-stripe-elements";
import API, { StripeUserData } from "../services/api";
import { useResource } from "react-request-hook";
import { ICard, subscriptions } from "stripe";
import { XOR } from "ts-xor";

function sleep(seconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  })
}

export interface SettingsContainerProps extends RouteComponentProps, RSE.InjectedStripeProps {
  user: UserResponseData;
  setUser: (user: UserResponseData) => void
  API: API;
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
const SettingContainer: FC<SettingsContainerProps> = (props) => {
  const { API, user, setUser } = props;
  
  ///////////////////////////////////
  // FETCHING USER'S STRIPE DATA
  ///////////////////////////////////
  const [stripeData, fetchStripeData] = useResource(API.payment.getUserStripeData(), []);
  let [hasStripe, setHasStripe] = useState(false);
  let [name, setName] = useState('Loading...');
  let [source, setSource] = useState(null as XOR<ICard, null>);
  let [subscription, setSubscription] = useState(null as XOR<subscriptions.ISubscription, null>);
  useEffect(function handleStripeDataLoad() {
    let { data, error } = stripeData;
    if (error){
      console.log('error fetching data: ', error);
      Alert.error(`Error fetching your subscription data: ${error.message}`)
    }
    if (data) {
      const userData: StripeUserData = data.data;
      const { customer, subscription } = userData;
      if (customer) {
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
        User: userData.user
      });
    }
  }, [stripeData]);


  ///////////////////////////////////
  // FETCHING USER'S DAPP COUNT
  ///////////////////////////////////
  const [listResponse, sendListRequest] = useResource(API.private.list(), []);
  const [usedNumDapps, markUsedNumOfDapps] = useState(-1)
  const handleFetchList = async () => {
    try {
      await API.refreshAuthorization();
      sendListRequest();
    } catch (err) {
      Alert.error(`Error fetching dapp list : ${err.message}`)
    }
  }
  useEffect(function handleListResponse(){
    const { isLoading, error, data } = listResponse;
    if (error) {
      switch (error.code) {
        default: {
          Alert.error(error.message);
        }
      }
    }
    if (data && !isLoading) {
      const { count } = data.data
      markUsedNumOfDapps(count);
    }
  }, [listResponse]);

  ///////////////////////////////////
  // UPDATING USER'S DAPP ALLOTMENT
  ///////////////////////////////////
  const [updateSubscriptionResponse, sendUpdateSubscriptionRequest] = useResource(API.payment.updatePlanCounts())
  async function sendUpdateDapps(numDapps: number) {
    let plans:StripePlans = {
      standard: numDapps,
      professional: parseInt(user.User.UserAttributes['custom:professional_limit']),
      enterprise: parseInt(user.User.UserAttributes['custom:enterprise_limit'])
    }
    let request = {
      plans: plans
    }
    sendUpdateSubscriptionRequest(request)
  }
  useEffect(function handleUpdateSubscription() {
    let { isLoading, data, error } = updateSubscriptionResponse;
    if (error) {
      Alert.error(`Error updating your subscription: ${error.message}`)
    } else if (data && !isLoading) {
      API.refreshUser()
      fetchStripeData()
    }
  }, [updateSubscriptionResponse])


  ///////////////////////////////////
  // UPDATING USER'S PAYMENT
  ///////////////////////////////////
  const [updatePaymentResponse, updatePaymentRequest] = useResource(API.payment.updatePaymentMethod());
  async function sendUpdatePayment(token: stripe.Token) {
    await API.refreshAuthorization();
    updatePaymentRequest({ token: token.id });
  }
  useEffect(function handleUpdatedPayment() {
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
  }, [updatePaymentResponse, fetchStripeData]);

  ///////////////////////////////////
  // STARTUP EFFECT
  ///////////////////////////////////
  useEffect(() => {
    handleFetchList()
  }, []);

  let paymentStatus = user.User.UserAttributes['custom:payment_status'] || 'ACTIVE';
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
              paymentStatus={paymentStatus}
              hasStripe={hasStripe}
              loadingData={stripeData.isLoading}
              submitWithToken={sendUpdatePayment}
              totalNumDapps={parseInt(user.User.UserAttributes['custom:standard_limit'])}
              submitUpdateDapps={sendUpdateDapps}
              usedNumDapps={usedNumDapps}

            />
          </LayoutContainer>
        </Box>
      </Container>
    </Box>
  );
}

export default injectStripe(SettingContainer);