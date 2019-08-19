import React, { FC } from "react";
import { Router, RouteComponentProps } from "@reach/router";
//TODO: add the full settings panel
import SettingContainer from "../pages/Settings";
import { ProfileState } from "../layout/Profile";
import { PasswordState } from "../layout/Password";
import { useResource } from 'react-request-hook';
import { UserResponseData } from '../types';
import API from "../services/api";

export interface Props extends RouteComponentProps {
  user : UserResponseData
  setUser : (user:UserResponseData)=>void
  API : API
}
export const SettingsContainerBase: React.SFC<Props> = ({user, setUser, API }) => {
  
    return (
      <Router>
        <SettingContainer
          default
          {...{ user, setUser, API }}
        />
      </Router>
    );
  };
  