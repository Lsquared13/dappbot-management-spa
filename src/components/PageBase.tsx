import React, { FC } from 'react';
import { RouteComponentProps } from '@reach/router';
import Box from './ui/Box';

export const PageBase: FC<RouteComponentProps> = (props) => {
  return (
    <div className='App body-right'>
      <Box alignSelf='center' style={{ margin: '20%' }}>
        {props.children}
      </Box>
    </div>
  )
}

export default PageBase;