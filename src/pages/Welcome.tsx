import React, { FC, useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';
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
  }, [user.signInUserSession, navigate])
  return (
    <div>
      <CallToAction />
      <MarketingContent />
    </div>
  )
}

export default Welcome;