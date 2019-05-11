import React, { FC } from 'react';
import { RouteComponentProps } from '@reach/router';
import Modal from 'react-modal';
import Navigation from './froala/Navigation';
import Footer from './froala/Footer';

Modal.setAppElement('#root')

Modal.defaultStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  },
  overlay : {
    zIndex                : 10
  }
};

export interface PageBaseProps extends RouteComponentProps {
  user?: any
  setUser: (newUser:any)=>void
}

export const PageBase: FC<PageBaseProps> = ({user, setUser, ...props}) => {
  return (
    <div className='App' id='appBase'>
      <Navigation user={user} setUser={setUser} />
      {props.children}
      <Footer />
    </div>
  )
}

export default PageBase;