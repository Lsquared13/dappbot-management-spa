import React from "react";
import { Router, RouteComponentProps } from "@reach/router";

import SettingContianer from "../pages/settingContainer";
import { ProfileState } from "../layout/Profile";
import { PasswordState } from "../layout/Password";



export interface Props extends RouteComponentProps {}

export const SettingsContainerBase: React.SFC<Props> = props => {
    return (
      <Router>
        <SettingContianer
          default
          /* Password tab props */
          onPasswordInputChange={inputs => {
            console.log("Password Inputs", inputs);
          }}
          onPasswordSave={(e, inputs: PasswordState) => {
            console.log("onPasswordSave", inputs);
          }}
          /* Profile tab props */
          onProfileDelete={(e, inputs: ProfileState) => {
            console.log("onProfileDelete", inputs);
          }}
          onProfileInputChange={inputs => {
            console.log("Profile Inputs", inputs);
          }}
          onProfileSave={(e, inputs: ProfileState) => {
            console.log("onProfileSave", inputs);
          }}
          /* Billing tab props */
          subscriptionPlan={{
            totalApps: 4,
            usedApps: 2,
            nextInvoice: 100,
            pastInvoice: 50,
            renewDate: "July 7th, 2019",
            apps: [
              {
                name: "test-bot",
                plan: "Standard",
                customMarkup: true,
                customBrand: true,
                customDomain: false,
                cost: 12,
                active: true
              },
              {
                name: "crypto-kitty",
                plan: "Standard",
                customMarkup: false,
                customBrand: true,
                customDomain: false,
                cost: 11,
                active: true
              }
            ]
          }}
          onCancelSubscription={() => {
            console.log("onCancelSubscription");
          }}
          onCreateSubscription={newPlan => {
            console.log("onCreateSubscription", newPlan);
          }}
          onPurchaseDapps={() => {
            console.log("onPurchaseDapps");
          }}
          onSave={subscriptionDetail => {
            console.log("Save changes", subscriptionDetail);
          }}
          onRenewSubscription={renewPlan => {
            console.log("onRenewSubscription", renewPlan);
          }}
          onUpdateSubscription={subscriptionPlan => {
            console.log("onUpdateSubscription", subscriptionPlan);
          }}
          onViewPastInvoice={() => {
            console.log("onViewPastInvoice");
          }}
        />
      </Router>
    );
  };
  