import React from 'react';
import './../bootstrap.min.css';
import './../froala_blocks.min.css';
import { Link } from '@reach/router';



const CallToAction = () => (
  <section className="fdb-block py-0" data-block-type="call_to_action" data-id={1}>
    <div className="container bg-r py-5 my-5 hide-md" style={{backgroundImage: 'url(Splash.svg)'}}>
      <div className="row py-5">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 text-left" style={{zIndex: 10000}}>
          <h1>Build Blockchain Dapps in Five Minutes</h1>
          <p className="lead">
            DappBot is a Dapp Generating Platform that automatically converts smart contracts into live Dapps hosted on AWS.
          </p>
          <p className="mt-4">
            <Link className="btn btn-primary" to='/signup'>Get Started</Link>
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default CallToAction;