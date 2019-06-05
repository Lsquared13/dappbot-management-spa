import React, { FC } from 'react';
import { RouteComponentProps } from '@reach/router';
import Alert from 'react-s-alert';
import Navigation from '../components/froala/Navigation';
import Footer from '../components/froala/Footer';


export interface PageBaseProps extends RouteComponentProps {

}

export const PageBase: FC<PageBaseProps> = (props) => {
  return (
    <div className='App' id='appBase'>
      <Alert stack={{limit: 3}} />
      <Navigation user={"fas"} setUser={()=>{return}} />
      {props.children}
      <Footer />
    </div>
  )
}

export default PageBase;