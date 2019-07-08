import React, { FC, useState } from "react";
import { Box, Text, Button, TextProps } from "../components/reusable/ui";
import {
  ButtonText,
  LayoutContainer,
  ReferenceLink,
  SubscriptionChanges,
  SubscriptionDetail,
  SubscriptionTable
} from "../components/reusable/dapp";

export * from "../components/reusable/dapp/SubscriptionTable";

export interface SubscriptionPlan {
  apps: SubscriptionDetail[];
  nextInvoice: number;
  pastInvoice: number;
  renewDate: string;
  totalApps: number;
  usedApps: number;
}

export interface BillingProps {
  subscriptionPlan: SubscriptionPlan;
  onCancelSubscription?: () => void;
  onCreateSubscription?: (newPlan: SubscriptionDetail) => void;
  onPurchaseDapps?: () => void;
  onRenewSubscription?: (renewPlan: SubscriptionDetail) => void;
  onSave?: (subscriptionDetail: SubscriptionChanges) => void;
  onUpdateSubscription?: (subscriptionPlan: SubscriptionDetail) => void;
  onViewPastInvoice?: () => void;
}

const Title: FC<TextProps> = props => (
  <Text
    size="sm"
    smSize="sm"
    mdSize="sm"
    lgSize="sm"
    textTransform="capitalize"
    {...props}
  >
    {props.children}
  </Text>
);

const States: FC<TextProps> = props => (
  <Box paddingY={3}>
    <Text size="xl" smSize="xl" mdSize="xl" lgSize="xl">
      {props.children}
    </Text>
  </Box>
);

export const Billing: FC<BillingProps> = props => {
  let [subcriptionDetails, setSubscriptionDetails] = useState();
  let {
    subscriptionPlan,
    onCancelSubscription,
    onCreateSubscription,
    onPurchaseDapps,
    onRenewSubscription,
    onSave,
    onUpdateSubscription,
    onViewPastInvoice
  } = props;
  return (
    <LayoutContainer>
      <Box display="flex">
        <Box flex="grow" marginRight={12}>
          <Title bold>Your Subscription</Title>
          <States>{subscriptionPlan.totalApps} Dapps</States>
          <ReferenceLink
            href="#"
            onClick={({ event }) => {
              event.preventDefault();
              onPurchaseDapps && onPurchaseDapps();
            }}
          >
            Purchase more Dapps
          </ReferenceLink>
        </Box>
        <Box marginRight={12}>
          <Title bold>Past Invoice</Title>
          <States>$ {subscriptionPlan.pastInvoice}</States>
          <ReferenceLink
            href="#"
            onClick={({ event }) => {
              event.preventDefault();
              onViewPastInvoice && onViewPastInvoice();
            }}
          >
            See past invoices
          </ReferenceLink>
        </Box>
        <Box marginRight={6}>
          <Title bold>Next Invoice</Title>
          <States>$ {subscriptionPlan.nextInvoice}</States>
          <Title>
            {subscriptionPlan.totalApps} Dapps renew monthly on{" "}
            {subscriptionPlan.renewDate}
          </Title>
        </Box>
      </Box>
      <Box
        color="blue"
        display="flex"
        justifyContent="between"
        alignItems="center"
        padding={2}
        marginTop={12}
        marginBottom={4}
      >
        <Title color="white">
          You have {subscriptionPlan.totalApps - subscriptionPlan.usedApps} Dapp
          available to create.
        </Title>
        <Box display="inlineBlock" color="white">
          <Button
            size="small"
            theme="outlineBlue"
            style="quiet"
            onClick={onPurchaseDapps}
          >
            <ButtonText>Purchase more Dapps</ButtonText>
          </Button>
        </Box>
      </Box>
      <SubscriptionTable
        dapps={subscriptionPlan.apps}
        enableCreateOption={
          !!(subscriptionPlan.totalApps - subscriptionPlan.usedApps)
        }
        renewDate={subscriptionPlan.renewDate}
        onCancelSubscription={onCancelSubscription}
        onCreateSubscription={onCreateSubscription}
        onRenewSubscription={onRenewSubscription}
        onSubscriptionChanges={changes => {
          setSubscriptionDetails(changes);
        }}
        onUpdateSubscription={onUpdateSubscription}
      />
      <Box display="flex" justifyContent="end">
        <ReferenceLink
          href="#"
          onClick={({ event }) => {
            event.preventDefault();
            onPurchaseDapps && onPurchaseDapps();
          }}
        >
          Purchase more Dapps
        </ReferenceLink>
      </Box>
      <Box marginTop={8}>
        <Button
          size="small"
          onClick={() => {
            onSave && onSave(subcriptionDetails);
          }}
        >
          <ButtonText>Save</ButtonText>
        </Button>
      </Box>
    </LayoutContainer>
  );
};

export default Billing;
