import React, { FC, useEffect } from 'react';
import { Link, RouteComponentProps, navigate } from '@reach/router';
import Navigation from '../components/froala/Navigation';
import CallToAction from '../components/froala/CallToAction';
import MarketingContent from '../components/froala/MarketingContent';

interface WelcomeProps extends RouteComponentProps {
  user: any
}

export const Welcome:FC<WelcomeProps> = ({user, navigate}) => {
  useEffect(()=>{
    if (navigate && user.signInUserSession){
      navigate('/home');
    }
  }, [user.signInUserSession])
  return (
    <div>
      <Navigation />
      <CallToAction />
      <MarketingContent />
    </div>
  )
}

export default Welcome;