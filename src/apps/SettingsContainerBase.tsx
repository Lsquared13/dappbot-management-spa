import React, { FC } from "react";
import { Router, RouteComponentProps } from "@reach/router";
//TODO: add the full settings panel
import SettingContainer from "../pages/Settings";
import { UserResponseData } from '../types';
import API from "../services/api";

export interface Props extends RouteComponentProps {
  user : UserResponseData
  API : API
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
  