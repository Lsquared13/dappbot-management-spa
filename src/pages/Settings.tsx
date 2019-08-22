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
import { getErrMsg } from "../services/util";

function sleep(seconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  })
}

export interface SettingsContainerProps extends RouteComponentProps, RSE.InjectedStripeProps {
  user: UserResponseData;
  API: API;
}

export interface SettingState {
  activeIndex: number;
  activeTab: string;
}

// Explicitly not exporting raw component because
// it needs to be run with the injectStripe HOC
// on the default object.
const SettingContainer: FC<SettingsContainerProps> = (props) => {
  const { API, user } = props;

  ///////////////////////////////////
  // TRIGGER DATA FETCHES
  ///////////////////////////////////
  useEffect(function fetchOnStartAndAPI(){
    // Note that by making this effect depend on the API
    // object, we will automatically refetch whenever the
    // Authorization changes (i.e. produces a new API instance).
    //
    // That is why handleListResponse() & handleStripeResponse
    // don't need to do anything when the API is stale; they will
    // get called again once it is fresh.
    makeListRequest()
    makeStripeRequest();
  }, [API]);

  ///////////////////////////////////
  // FETCHING USER'S STRIPE DATA
  ///////////////////////////////////
  const [stripeResponse, requestStripe] = useResource(API.payment.getUserStripeData(), []);
  let [hasStripe, setHasStripe] = useState(false);
  let [name, setName] = useState('Loading...');
  let [source, setSource] = useState(null as XOR<ICard, null>);
  let [subscription, setSubscription] = useState(null as XOR<subscriptions.ISubscription, null>);
  let [invoice, setInvoice] = useState(null as XOR<Invoice, null>);
  async function makeStripeRequest(){
    try {
      const refreshedAPI = await API.refreshAuthorization();
      if (refreshedAPI === API) {
        requestStripe();
      }
    } catch (err) {
      Alert.error(`Error fetching Stripe data : ${getErrMsg(err)}`)
    }
  }
  useEffect(function handleStripeDataLoad() {
    let { data, error } = stripeResponse;
    if (error) {
      console.log('error fetching Stripe data: ', error);
      Alert.error(`Error fetching your subscription data: ${getErrMsg(error)}`)
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
    }
  }, [stripeResponse]);


  ///////////////////////////////////
  // FETCHING USER'S DAPP COUNT
  ///////////////////////////////////
  const [listResponse, requestList] = useResource(API.private.list());
  const [usedNumDapps, markUsedNumOfDapps] = useState(-1)
  const makeListRequest = async () => {
    try {
      const refreshedAPI = await API.refreshAuthorization();
      if (refreshedAPI === API) {
        requestList();
      }
    } catch (err) {
      Alert.error(`Error requesting your dapp count : ${getErrMsg(err)}`)
    }
  }
  useEffect(function handleListResponse() {
    const { isLoading, error, data } = listResponse;
    if (error) {
      switch (error.code) {
        default: {
          Alert.error(`Error from getting your dapp count : ${getErrMsg(error)}`);
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
  const [updateDappsResponse, requestUpdateDapps] = useResource(API.payment.updatePlanCounts())
  async function makeUpdateDappsRequest(numDapps: number) {
    let plans: StripePlans = {
      standard: numDapps,
      professional: parseInt(user.User.UserAttributes['custom:professional_limit']),
      enterprise: parseInt(user.User.UserAttributes['custom:enterprise_limit'])
    }
    let request = {
      plans: plans
    }
    const refreshedAPI = await API.refreshAuthorization({ userMustRetry : true });
    if (refreshedAPI === API) {
      requestUpdateDapps(request)
    }
  }
  useEffect(function handleUpdateDappsResponse() {
    let { isLoading, data, error } = updateDappsResponse;
    if (error) {
      console.log('error: ',error);
      Alert.error(`Error updating your subscription: ${getErrMsg(error)}`)
    } else if (data && !isLoading) {
      API.refreshUser()
      requestStripe()
    }
  }, [updateDappsResponse])


  ///////////////////////////////////
  // UPDATING USER'S PAYMENT
  ///////////////////////////////////
  const [updatePaymentResponse, requestUpdatePayment] = useResource(API.payment.updatePaymentMethod());
  async function makeUpdatePaymentRequest(token: stripe.Token) {
    const refreshedAPI = await API.refreshAuthorization({ userMustRetry : true });
    if (refreshedAPI === API) {
      requestUpdatePayment({ token: token.id });
    }
  }
  useEffect(function handleUpdatedPaymentResponse() {
    let { isLoading, data, error } = updatePaymentResponse;
    if (error) {
      Alert.error(`Error updating your card: ${getErrMsg(error)}`)
    } else if (data && !isLoading) {
      requestStripe();
      sleep(5).then(() => {
        // Payment status may take a few seconds to propagate,
        // this sleep gives the infra a moment to do its magic.
        API.refreshUser();
      })
    }
  }, [updatePaymentResponse, requestStripe]);

  ///////////////////////////////////
  // STARTUP EFFECT
  ///////////////////////////////////
  useEffect(() => {
    makeListRequest()
  }, [API]);

  let paymentStatus = user.User.UserAttributes['custom:payment_status'] || 'ACTIVE';
  return (
    <Box>
      <Breadcrumb title={"none"} />

      <Title title={'Profile'} />
      <Container>
        <Box>
          <LayoutContainer>
            <Billing source={source}
              subscription={subscription}
              name={name}
              email={user.User.Email}
              invoice={invoice}
              paymentStatus={paymentStatus}
              hasStripe={hasStripe}
              loadingData={stripeResponse.isLoading}
              submitWithToken={makeUpdatePaymentRequest}
              totalNumDapps={parseInt(user.User.UserAttributes['custom:standard_limit'])}
              submitUpdateDapps={makeUpdateDappsRequest}
              usedNumDapps={usedNumDapps}
            />
          </LayoutContainer>
        </Box>
      </Container>
    </Box>
  );
}

export default injectStripe(SettingContainer);