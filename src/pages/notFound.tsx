import React from "react"
import { RouteComponentProps } from "@reach/router";
export interface Props extends RouteComponentProps {}


export const NotFound: React.SFC<Props> = props => {
    return <div>Sorry, nothing here</div>;
  };
  