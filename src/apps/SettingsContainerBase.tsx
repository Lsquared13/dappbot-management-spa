import React, { FC } from "react";
import { Router, RouteComponentProps } from "@reach/router";
import DappbotAPI from '@eximchain/dappbot-api-client';
import User from "@eximchain/dappbot-types/spec/user";
//TODO: add the full settings panel
import SettingContainer from "../pages/Settings";


export interface Props extends RouteComponentProps {
  user : User.AuthData
  API : DappbotAPI
}
export const SettingsContainerBase: React.SFC<Props> = ({user, API }) => {
  
    return (
      <Router>
        <SettingContainer
          default
          {...{ user, API }}
        />
      </Router>
    );
  };
  