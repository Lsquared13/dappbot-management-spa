import React, { FC, useState, useEffect, useRef } from "react";
import { RouteComponentProps } from "@reach/router";
import Alert from 'react-s-alert';
import { useResource } from "react-request-hook";
import { XOR } from "ts-xor";

import DappbotAPI from '@eximchain/dappbot-api-client';
import User, { Challenges } from "@eximchain/dappbot-types/spec/user";
import { StripePlans, StripeTypes } from '@eximchain/dappbot-types/spec/methods/payment';

import { Container, Breadcrumb, Title, LayoutContainer } from "../layout";
import { Box } from "../components/ui";
import Billing from '../components/Billing';
import { injectStripe, ReactStripeElements as RSE } from "react-stripe-elements";
import { getErrMsg, sleep } from "../services/util";
import Track from "../services/analytics";

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
      try {
        API.loginViaRefresh()
      } catch (err) {
        console.error('Unable to perform refresh login: ',err);
      }
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
      try {
        API.loginViaRefresh()
      } catch (err) {
        console.error('Unable to perform refresh login: ',err);
      }
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
  const newDappCapacity = useRef(parseInt(user.User.UserAttributes["custom:standard_limit"]));
  async function makeUpdateDappsRequest(numDapps: number) {
    let plans: StripePlans = {
      standard: numDapps,
      professional: parseInt(user.User.UserAttributes['custom:professional_limit']),
      enterprise: parseInt(user.User.UserAttributes['custom:enterprise_limit'])
    }
    newDappCapacity.current = numDapps;
    let request = {
      plans: plans
    }
    if (API.hasActiveAuth()) {
      requestUpdateDapps(request);
    } else if (API.hasStaleAuth()) {
      try {
        API.loginViaRefresh()
      } catch (err) {
        console.error('Unable to perform refresh login: ',err);
      }
    }
  }
  useEffect(function handleUpdateDappsResponse() {
    let { isLoading, data, error } = updateDappsResponse;
    if (error) {
      console.log('error: ',error);
      Alert.error(`Error updating your subscription: ${getErrMsg(error)}`)
    } else if (data && !isLoading) {

      // We know that we just successfully updated the
      // dapp capacity, track the change.
      Track.capacityUpdated(
        user.User.Email, 
        parseInt(user.User.UserAttributes["custom:standard_limit"]),
        newDappCapacity.current
      )

      requestStripe()
      try {
        API.loginViaRefresh()
      } catch (err) {
        console.error('Unable to perform refresh login: ', err);
      }
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
      try {
        API.loginViaRefresh()
      } catch (err) {
        console.error('Unable to perform refresh login: ',err);
      }
    }
  }
  useEffect(function handleUpdatedPaymentResponse() {
    let { isLoading, data, error } = updatePaymentResponse;
    if (error) {
      Alert.error(`Error updating your card: ${getErrMsg(error)}`)
    } else if (data && !isLoading) {

      // We know updating payment was just successful.  Depending
      // on whether we already had a payment source, track an
      // appropriate event.
      if (source === null) {
        Track.cardAdded(API.authData.User.Email);
      } else {
        Track.cardUpdated(API.authData.User.Email);
      }

      // Refetch all updated payment details
      requestStripe();

      // Payment status on the Cognito user document may take 
      // a few seconds to propagate, this sleep gives the infra
      // a moment to do its magic.  Note that we don't expect 
      // the auth to be stale; we are logging in again so that 
      // we refetch the user's profile data.
      sleep(5).then(() => {
        API.loginViaRefresh();
      })
    }
  }, [updatePaymentResponse, requestStripe]);

  let paymentStatus = user.User.UserAttributes['custom:payment_status'] || 'ACTIVE';
  let preferredMfa = user.User.PreferredMfaSetting ? user.User.PreferredMfaSetting as Challenges.MfaTypes : null;
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
              API={API} // TODO factor MFA out of billing
              refreshToken={user.RefreshToken} // TODO factor MFA out of billing
              preferredMfa={preferredMfa} // TODO factor MFA out of billing
            />
          </LayoutContainer>
        </Box>
      </Container>
    </Box>
  );
}

export default injectStripe(SettingContainer);