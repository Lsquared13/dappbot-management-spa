import React, { FC } from 'react';
import { RouteComponentProps } from '@reach/router';
import Navigation from '../components/froala/Navigation';
import Footer from '../components/froala/Footer';

export interface PageBaseProps extends RouteComponentProps {

}

export const PageBase: FC<PageBaseProps> = (props) => {
  // AppBase is responsible for providing outermost
  // div & the Alert component
  return (
    <>
      <Navigation user={"fas"} setUser={()=>{return}} />
      {props.children}
      <Footer />
    </>
  )
}

export default PageBase;