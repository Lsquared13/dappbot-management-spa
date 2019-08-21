import React, { FC, useState, useEffect } from "react";
import { RouteComponentProps } from "@reach/router";
import Alert from 'react-s-alert';
import { Container, Breadcrumb, Title, LayoutContainer } from "../layout";
import { Box } from "../components/ui";
import Profile from "../layout/Profile";
import Billing from '../components/Billing';
import { UserResponseData, StripePlans } from "../types";
import { injectStripe, ReactStripeElements as RSE } from "react-stripe-elements";
import API, { StripeUserData, Invoice } from "../services/api";
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
  let [invoice, setInvoice] = useState(null as XOR<Invoice, null>);
  useEffect(function handleStripeDataLoad() {
    let { data, error } = stripeData;
    if (error) {
      console.log('error fetching Stripe data: ', error);
      Alert.error(`Error fetching your subscription data: ${error.data.message}`)
    }
    if (data) {
      const userData: StripeUserData = data.data;
      const { customer, subscription, invoice } = userData;
      if (customer) {
        setSource(customer.default_source as XOR<ICard, null>);
        setName(customer.name || '');
        setInvoice(invoice || null);
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
  const [listResponse, sendListRequest] = useResource(API.private.list());
  const [usedNumDapps, markUsedNumOfDapps] = useState(-1)
  const handleFetchList = async () => {
    try {
      const refreshedAPI = await API.refreshAuthorization();
      if (refreshedAPI === API) {
        sendListRequest();
      } else {
        Alert.info("We just refreshed your authorization to our server, one moment...", { timeout : 1000 });
      }
    } catch (err) {
      Alert.error(`Error fetching dapp list : ${err.message || err.toString()}`)
    }
  }
  useEffect(function getListOnStartAndAPI(){
    // Note that by making this effect depend on the API
    // object, we will automatically refetch whenever the
    // Authorization changes (i.e. produces a new API instance).
    //
    // That is why handleFetchList() doesn't need to do
    // anything when the API is stale; it will get called
    // again once it is fresh.
    handleFetchList()
  }, [API]);
  useEffect(function handleListResponse() {
    const { isLoading, error, data } = listResponse;
    if (error) {
      switch (error.code) {
        default: {
          Alert.error(error.data.message);
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
    let plans: StripePlans = {
      standard: numDapps,
      professional: parseInt(user.User.UserAttributes['custom:professional_limit']),
      enterprise: parseInt(user.User.UserAttributes['custom:enterprise_limit'])
    }
    let request = {
      plans: plans
    }
    const refreshedAPI = await API.refreshAuthorization();
    if (refreshedAPI === API) {
      sendUpdateSubscriptionRequest(request)
    } else {
      Alert.info("We just refreshed your authorization to our server, please try that again.");
    }
  }
  useEffect(function handleUpdateSubscription() {
    let { isLoading, data, error } = updateSubscriptionResponse;
    if (error) {
      Alert.error(`Error updating your subscription: ${error.data.message}`)
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
    const refreshedAPI = await API.refreshAuthorization();
    if (refreshedAPI === API) {
      updatePaymentRequest({ token: token.id });
    } else {
      Alert.info("We just refreshed your authorization to our server, please try that again.");
    }
  }
  useEffect(function handleUpdatedPayment() {
    let { isLoading, data, error } = updatePaymentResponse;
    if (error) {
      Alert.error(`Error updating your card: ${error.data.message}`)
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
  }, [API]);

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
              invoice={invoice}
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