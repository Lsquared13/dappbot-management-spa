import React from 'react';
import './../bootstrap.min.css';
import './../froala_blocks.min.css';
import { navigate } from '@reach/router';

const SecondaryNav = () => (
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

export default SecondaryNav;