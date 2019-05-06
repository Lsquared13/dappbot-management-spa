import React, { FC } from 'react';
import { RouteComponentProps } from '@reach/router';
import Box from './ui/Box';
import Footer from './froala/Footer';


export const PageBase: FC<RouteComponentProps> = (props) => {
  return (
    <div className='App'>
      {props.children}
      <Footer />
    </div>
  )
}

export default PageBase;