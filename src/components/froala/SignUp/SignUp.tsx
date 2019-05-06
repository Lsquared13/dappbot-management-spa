import React from 'react';
import './../bootstrap.min.css';
import './../froala_blocks.min.css';
import { navigate } from '@reach/router';

const SignUp = () => (
  <section className="fdb-block fp-active" data-block-type="forms" data-id={2}>
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-7 col-md-5 text-center">
          <div className="fdb-box fdb-touch">
            <div className="row">
              <div className="col">
                <h1>Register</h1>
              </div>
            </div>
            <div className="row">
              <div className="col mt-4">
                <input type="text" className="form-control" placeholder="Name" />
              </div>
            </div>
            <div className="row mt-4">
              <div className="col">
                <input type="text" className="form-control" placeholder="Email" />
              </div>
            </div>
            <div className="row mt-4">
              <div className="col">
                <input type="password" className="form-control mb-1" placeholder="Password" />
                <p className="text-right"><a href="https://www.froala.com">Already have an account?</a></p>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col">
                <button className="btn btn-primary" type="button">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default SignUp;