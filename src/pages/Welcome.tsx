import React, { FC } from 'react';
import { Link, RouteComponentProps, navigate } from '@reach/router';
import Box from '../components/ui/Box';
import Button from '../components/ui/Button';

export const Welcome:FC<RouteComponentProps> = (props) => {
  return (
    <Box alignSelf='center' style={{margin:'25%'}}>
      <h1>Welcome to Dappsmith</h1>
      <Button block onClick={()=>{navigate('/login')}}>Sign In</Button>
      <Button block onClick={()=>{navigate('/signup')}}>Sign Up</Button>
    </Box>
  )
}

export default Welcome;