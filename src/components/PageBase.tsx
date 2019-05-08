import React, { FC } from 'react';
import { RouteComponentProps } from '@reach/router';
import Modal from 'react-modal';
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

export const PageBase: FC<RouteComponentProps> = (props) => {
  return (
    <div className='App' id='appBase'>
      {props.children}
      <Footer />
    </div>
  )
}

export default PageBase;