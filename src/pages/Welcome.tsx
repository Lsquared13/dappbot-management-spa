import React, { FC } from 'react';
import { Link, RouteComponentProps, navigate } from '@reach/router';
import Box from '../components/ui/Box';
import Button from '../components/ui/Button';
import Navigation from '../components/froala/Navigation';
import CallToAction from '../components/froala/CallToAction';
import Content from '../components/froala/Content';
import Footer from '../components/froala/Footer';

export const Welcome:FC<RouteComponentProps> = (props) => {
  return (
    <div>
      <Navigation />
      <CallToAction />
      <Content />
      <Footer />
    </div>
  )
}

export default Welcome;