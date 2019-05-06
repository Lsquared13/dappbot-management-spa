import React from 'react';
import './../bootstrap.min.css';
import './../froala_blocks.min.css';
import { navigate } from '@reach/router';

const Footer = () => (
  <footer className="fdb-block footer-small" data-block-type="footers" data-id={11}>
    <div className="container">
      <div className="row text-center align-items-center">
        <div className="col-12 col-md-8">
          <ul className="nav justify-content-center justify-content-md-start align-items-center">
            <li className="nav-item">
              <a className="nav-link active" href="">
              <img src="DappBot.svg" alt="image" style={{height: 30}} /></a>
            </li>
            <li className="w-100 d-block d-sm-none" />
            <li className="nav-item">
              <a className="nav-link" href="">Privacy Policy</a>
            </li>
          </ul>
        </div>
        <div className="col-12 col-md-4 mt-4 mt-md-0 text-md-right">
          © 2019 Eximchain
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;