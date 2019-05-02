import React, { FC } from 'react';
import { RouteComponentProps } from '@reach/router';
import { StripeProvider } from 'react-stripe-elements';
import Box from './ui/Box';

export const PageBase: FC<RouteComponentProps> = (props) => {
  return (
    <StripeProvider apiKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_API_KEY as string}>
      <div className='App body-right'>
        <Box alignSelf='center' style={{ margin: '20%' }}>
          {props.children}
        </Box>
      </div>
    </StripeProvider>
  )
}

export default PageBase;