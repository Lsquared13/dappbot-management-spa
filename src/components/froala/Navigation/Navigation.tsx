import React, { FC, useState } from 'react';
import './../bootstrap.min.css';
import './../froala_blocks.min.css';
import { Link } from '@reach/router';
import { emptyUserResponse } from '../../../types';

export interface NavProps {
  hideLogin?: boolean
  user?: any
  setUser: (newUser:any)=>void
}

export const Navigation:FC<NavProps> = ({hideLogin, user, setUser}) => {

  const [mobileNavVisible, setMobileNavVisible] = useState(false);

  function toggleMobileNav() {
    setMobileNavVisible(!mobileNavVisible);
  };
  
  const logOut = () => {
    setUser(emptyUserResponse());
  }

  const loginLogoutLink = user.signInUserSession ? (
    <Link className='nav-link' onClick={logOut} to='/login'>Log Out</Link>
  ) : (
    <Link className="btn btn-primary" to='/login'>Login</Link>
  )

  return (
    <header data-block-type="headers" data-id={1}>
      <div className="container">
        <nav className="navbar navbar-expand-md">
          <a className="navbar-brand" href="/">
            <img src="/DappBot.svg" alt="DappBot Logo" style={{height: 30}} />
          </a>
          <button className="navbar-toggler" type="button" 
            data-toggle="collapse" data-target="#navbarNav3" 
            aria-controls="navbarNav3" aria-expanded="false" 
            aria-label="Toggle navigation" onClick={toggleMobileNav}>
            <span className="navbar-toggler-icon" />
          </button>
          <div className={`collapse navbar-collapse ${mobileNavVisible ? " show" : ""}`} id="navbarNav3">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                  <a className="nav-link" href="#features">Features</a>
              </li>
              <li className="nav-item">
                  <a className="nav-link" href="#learn">Learn</a>
              </li>
              <li className="nav-item">
                  <a className="nav-link" target="_blank" href="https://dappbot.drift.help/category/getting-started/" rel="noopener noreferrer">Docs</a>
              </li>
              <li className="nav-item">
                  <a className="nav-link mr-3 mb-2" href="https://support.eximchain.com/hc/en-us/requests/new" rel="noopener noreferrer">Support</a>
              </li>
              <li className="nav-item">
                { loginLogoutLink }
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;

Navigation.defaultProps = {
  hideLogin: false
};