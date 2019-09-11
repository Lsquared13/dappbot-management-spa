import React, { FC, useState, useEffect } from "react";
import { RouteComponentProps } from "@reach/router";
import Alert from 'react-s-alert';
import { useResource } from "react-request-hook";
import { XOR } from "ts-xor";

import DappbotAPI from '@eximchain/dappbot-api-client';
import User from "@eximchain/dappbot-types/spec/user";
import { StripePlans, StripeTypes } from '@eximchain/dappbot-types/spec/methods/payment';

import { Container, Breadcrumb, Title, LayoutContainer } from "../layout";
import { Box } from "../components/ui";
import Billing from '../components/Billing';
import { injectStripe, ReactStripeElements as RSE } from "react-stripe-elements";
import { getErrMsg, sleep } from "../services/util";

export interface SettingsContainerProps extends RouteComponentProps, RSE.InjectedStripeProps {
  user: User.AuthData;
  API: DappbotAPI;
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
  const [stripeResponse, requestStripe] = useResource(API.payment.readStripe.resource);
  let [hasStripe, setHasStripe] = useState(false);
  let [name, setName] = useState('Loading...');
  let [source, setSource] = useState(null as XOR<StripeTypes.Card, null>);
  let [subscription, setSubscription] = useState(null as XOR<StripeTypes.Subscription, null>);
  let [invoice, setInvoice] = useState(null as XOR<StripeTypes.Invoice, null>);
  async function makeStripeRequest(){
    if (API.hasActiveAuth()) {
      requestStripe();
    } else if (API.hasStaleAuth()) {
      API.refreshAuth()
    }
  }
  useEffect(function handleStripeDataLoad() {
    let { data, error } = stripeResponse;
    if (error) {
      console.log('error fetching Stripe data: ', error);
      Alert.error(`Error fetching your subscription data: ${getErrMsg(error)}`)
    }
    if (data && data.data && data.data.user) {
      const { customer, subscription, invoice } = data.data;
      if (customer) {
        setSource(customer.default_source as XOR<StripeTypes.Card, null>);
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
  const [listResponse, requestList] = useResource(API.private.listDapps.resource);
  const [usedNumDapps, markUsedNumOfDapps] = useState(-1)
  const makeListRequest = async () => {
    if (API.hasActiveAuth()) {
      requestList();
    } else if (API.hasStaleAuth()) {
      API.refreshAuth()
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
    if (data && data.data && !isLoading) {
      const { count } = data.data
      markUsedNumOfDapps(count);
    }
  }, [listResponse]);

  ///////////////////////////////////
  // UPDATING USER'S DAPP ALLOTMENT
  ///////////////////////////////////
  const [updateDappsResponse, requestUpdateDapps] = useResource(API.payment.updatePlanCounts.resource)
  async function makeUpdateDappsRequest(numDapps: number) {
    let plans: StripePlans = {
      standard: numDapps,
      professional: parseInt(user.User.UserAttributes['custom:professional_limit']),
      enterprise: parseInt(user.User.UserAttributes['custom:enterprise_limit'])
    }
    let request = {
      plans: plans
    }
    if (API.hasActiveAuth) {
      requestUpdateDapps(request);
    } else {
      API.loginViaRefresh()
    }
  }
  useEffect(function handleUpdateDappsResponse() {
    let { isLoading, data, error } = updateDappsResponse;
    if (error) {
      console.log('error: ',error);
      Alert.error(`Error updating your subscription: ${getErrMsg(error)}`)
    } else if (data && !isLoading) {
      API.loginViaRefresh()
      requestStripe()
    }
  }, [updateDappsResponse])


  ///////////////////////////////////
  // UPDATING USER'S PAYMENT
  ///////////////////////////////////
  const [updatePaymentResponse, requestUpdatePayment] = useResource(API.payment.updateCard.resource);
  async function makeUpdatePaymentRequest(token: stripe.Token) {
    if (API.hasActiveAuth()) {
      requestUpdatePayment({ token : token.id })
    } else if (API.hasStaleAuth()) {
      await API.loginViaRefresh();
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
        API.loginViaRefresh();
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