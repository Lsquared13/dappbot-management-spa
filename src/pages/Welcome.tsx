import React, { FC } from 'react';
import { Link, RouteComponentProps, navigate } from '@reach/router';
import Navigation from '../components/froala/Navigation';
import CallToAction from '../components/froala/CallToAction';
import MarketingContent from '../components/froala/MarketingContent';

export const Welcome:FC<RouteComponentProps> = (props) => {
  return (
    <div>
      <Navigation />
      <CallToAction />
      <MarketingContent />
    </div>
  )
}

export default Welcome;