import React, { FC } from "react";
import { RouteComponentProps } from "@reach/router";
import Alert from "react-s-alert";

export interface AppBaseProps {

}

export const AppBase: FC<AppBaseProps> = (props) => {
  // Alert must only be mounted once and must stay mounted for the 
  // life of the application.
  return (
    <div className="App" id="appBase">
      {props.children}
      <Alert stack={{limit: 3}} timeout={10000} />
    </div>
  );
};

export default AppBase;
