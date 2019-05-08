import React, { FC } from 'react';
import './../bootstrap.min.css';
import './../froala_blocks.min.css';
import { navigate } from '@reach/router';

interface NavProps {
  hideLogin?: boolean
}

export const Navigation:FC<NavProps> = ({hideLogin}) => {
  if (hideLogin) {
    return (
      <header data-block-type="headers" data-id={1} style={{marginTop: 20,}}>
        <div className="container text-center">
          <nav className="navbar">
            <a className="ml-auto mr-auto" href="/">
              <img src="DappBot.svg" alt="image" style={{height: 30}} />
            </a>
          </nav>
        </div>
      </header>
    );
  }

  return (
    <header data-block-type="headers" data-id={1}>
      <div className="container">
        <nav className="navbar navbar-expand-md">
          <a className="navbar-brand" href="/">
            <img src="DappBot.svg" alt="image" style={{height: 30}} />
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav3" aria-controls="navbarNav3" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav3">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="" onClick={()=>{navigate('/login')}}>Login</a>
              </li>
            </ul>
            <a className="btn btn-outline-primary ml-md-3" href="" onClick={()=>{navigate('/signup')}}>Sign Up</a>
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