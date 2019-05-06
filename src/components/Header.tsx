import React, { FunctionComponent } from 'react';
import Divider from './ui/Divider';

interface HeaderProps {
  
}

export const Header:FunctionComponent<HeaderProps> = (props)=>{
  return (
    <header className='app-header'>
      <h1 style={{textAlign:'center'}}>Dapperator</h1>
      <Divider />
    </header>
  )
}

export default Header;