import React from 'react';
import { Link } from '@reach/router';

export const PricingTable = () => (
  <section className="fdb-block fp-active">
          <div className="container">
            <div className="row text-center">
              <div className="col">
                <h1>Pricing Plans</h1>
              </div>
            </div>
            <div className="row mt-5 align-items-center no-gutters">
              <div className="col-12 col-sm-10 col-md-8 m-auto col-lg-4 text-center shadow">
                <div className="bg-white pb-5 pt-5 pl-4 pr-4 rounded-left">
                <h3><strong>Free Trial</strong></h3>
                  <p className="h4 hide">&lt; 10 employees</p>
                  <p className="h1 mt-5">$0 <span className="lead"> 1 Dapp for 14 Days</span></p>
                  <p>Create a Dapp with only a smart contract ABI. No coding required.</p>
                  <hr />
                  <p><em>Only 1 Dapp</em></p>
                  <p><em>Free hosting</em></p>
                  <p className="text-center pt-5">
                    <Link className="btn btn-outline-primary" to='/signup'>Start your Free Trial</Link>
                  </p>
                </div>
              </div>
              <div className="col-12 col-sm-10 col-md-8 ml-auto mr-auto col-lg-4 text-center mt-4 mt-lg-0 sl-1 pt-0 pt-lg-3 pb-0 pb-lg-3 bg-white fdb-touch rounded shadow">
                <div className="pb-5 pt-5 pl-4 pr-4">
                <h3><strong>Standard</strong></h3>
                  <p className="h4 hide">10-100 employees</p>
                  <p className="h1 mt-5">$10 <span className="lead"> Dapp / Month</span></p>
                  <p>Create unlimited Dapps with only a smart contract ABI. No coding required.</p>
                  <hr />
                  <p><em>Unlimited Dapps</em></p>
                  <p><em>Prorated Subscription</em></p>
                  <p className="text-center pt-5">
                    <Link className="btn btn-primary" to='/signup'>Create your Dapp</Link>
                  </p>
                </div>
              </div>
              <div className="col-12 col-sm-10 col-md-8 ml-auto mr-auto col-lg-4 text-center mt-4 mt-lg-0 shadow">
                <div className="bg-white pb-5 pt-5 pl-4 pr-4 rounded-right">
                <h3><strong>Enterprise</strong></h3>
                  <p className="h4 hide">&gt;100 employees</p>
                  <p className="h1 mt-5">Let's chat</p>
                  <p>Create unlimited Enterprise Dapps with only a smart contract ABI. No coding required.</p>
                  <hr />
                  <p><em>All <b>Standard</b> Features</em></p>
                  <p><em>Custom Subdomain</em></p>
                  <p className="text-center pt-5">
                    <a className="btn btn-outline-primary" href="mailto:hello@eximchain?Subject=DappBot%20Enterprise" target="_blank" rel="noopener norefferer">Contact Us</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
)

export default PricingTable;