import React, { FC } from "react";
import { RouteComponentProps } from "@reach/router";
import Alert from "react-s-alert";
import Navigation from "../components/froala/Navigation";
import Footer from "../components/froala/Footer";
import Header, { HeaderState }  from "./Header";



export interface HomeBaseProps extends RouteComponentProps {
  user?: any
  setUser: (newUser:any)=>void
}

export const HomeBase: FC<HomeBaseProps> = ({user, setUser,uri, ...props}) => {

  // TODO: Kick people out if they don't have a user object
  return (
    <div className="App" id="appBase">
      <Alert stack={{ limit: 3 }} timeout={30000} />
      <Header setUser={setUser} user={user} uri={uri} />
      {props.children}
      <Footer />
    </div>
  );
};

export default HomeBase;
