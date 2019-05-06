import React, { FC } from 'react';
import { RouteComponentProps } from '@reach/router';
import Box from './ui/Box';

export const PageBase: FC<RouteComponentProps> = (props) => {
  return (
    <div className='App'>
      {props.children}
    </div>
  )
}

export default PageBase;