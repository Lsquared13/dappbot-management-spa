import React from "react"
import { RouteComponentProps } from "@reach/router";

export interface NotFoundProps extends RouteComponentProps {}

export const NotFound: React.SFC<NotFoundProps> = props => {
    return <div>Sorry, nothing here</div>;
};

export default NotFound;