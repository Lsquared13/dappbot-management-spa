import React, { FC, useEffect } from "react";
import { RouteComponentProps } from "@reach/router";
import Alert from "react-s-alert";
import Navigation from "../components/froala/Navigation";
import Footer from "../components/froala/Footer";
import Header, { HeaderState }  from "./Header";
import { UserResponseData } from "../types";



export interface HomeBaseProps extends RouteComponentProps {
  user: UserResponseData
  setUser: (newUser:any)=>void
}

export const HomeBase: FC<HomeBaseProps> = ({user, setUser,uri, ...props}) => {

  useEffect(function puntLoggedOutUsers(){
    if (user.Authorization === '' && props.navigate) {
      props.navigate('/login')
    }
  }, [user])
  
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
