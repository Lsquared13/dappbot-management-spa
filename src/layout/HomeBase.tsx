import React, { FC, useEffect } from "react";
import { RouteComponentProps } from "@reach/router";
import Alert from "react-s-alert";
import Navigation from "../components/froala/Navigation";
import Footer from "../components/froala/Footer";
import {PaymentStatusBanner} from "../components/PaymentStatusBanner"
import Header, { HeaderState }  from "./Header";
import { UserResponseData } from "../types";



export interface HomeBaseProps extends RouteComponentProps {
  user: UserResponseData
  setUser: (newUser:UserResponseData)=>void
}

export const HomeBase: FC<HomeBaseProps> = ({user, setUser,uri, ...props}) => {

  useEffect(function puntLoggedOutUsers(){
    if (user.Authorization === '' && props.navigate) {
      props.navigate('/login')
    }
  }, [user])
  
  // AppBase is responsible for providing outermost
  // div & the Alert component
  console.log(user)
  return (
    <>
      <Header setUser={setUser} user={user} uri={uri} />
      <PaymentStatusBanner paymentState={user.User.UserAttributes["custom:payment_status"]}/>
      {props.children}
      <Footer />
    </>
  );
};

export default HomeBase;
