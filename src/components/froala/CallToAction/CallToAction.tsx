import React from 'react';
import './../bootstrap.min.css';
import './../froala_blocks.min.css';
import { Link } from '@reach/router';



const CallToAction = () => (
  <section className="fdb-block py-0" data-block-type="call_to_action" data-id={1}>
    <div className="container bg-r py-5 my-5 hide-md" id="hero">
      <div className="row py-5">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 text-left" style={{zIndex: 10000}}>
          {/* <h1>DappBot</h1> */}
          <h2>Create Dapps with only a smart contract ABI. No coding required.</h2>
          <p className="lead">Five Minutes, Three Steps, Zero coding, build and share your Blockchain Application with a unique URL using DappBot today.</p>
          <p className="mt-5">
            <Link className="btn btn-primary" to='/signup'>Start Your Free Trial</Link>
          </p>
          <p className="mt-3">
            <a className="link" href='#apps'>Learn How it Works</a>
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default CallToAction;