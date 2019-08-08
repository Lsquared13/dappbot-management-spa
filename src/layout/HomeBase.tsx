import React, { FC, useEffect } from "react";
import { RouteComponentProps } from "@reach/router";
import Alert from "react-s-alert";
import Navigation from "../components/froala/Navigation";
import Footer from "../components/froala/Footer";
import {PaymentLapseBanner} from "../components/PaymentLapseBanner"
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
  return (
    <>
      <Header setUser={setUser} user={user} uri={uri} />
      <PaymentLapseBanner paymentState={true}/>
      {props.children}
      <Footer />
    </>
  );
};

export default HomeBase;
