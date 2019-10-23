import React from 'react';

export const Applications = () => (
  <section className="fdb-block" data-block-type="features" id="apps">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 text-center">
          <h1>How can DappBot help you?</h1>
          <p className="lead">Instantly bootstrapping Dapps is attractive for a number of applications, including:</p>
        </div>
      </div>
      <div className="row text-center mt-5">
        <div className="col-12 col-sm-4">
          <img alt="Hosted Infrastructure" className="fdb-icon" src="Hosted.svg" />
          <h3 className="text-left"><strong>Educational Tool</strong><br />Spend your time on smart contracts rather than web apps</h3>
          <p className="text-left">Are you learning about smart contracts, or need an interface for your Hackathon project, but don’t want to spend time creating a front-end for your Dapps? We can get you a responsive Dapp interface in five minutes.</p>
        </div>
        <div className="col-12 col-sm-4 pt-4 pt-sm-0">
          <img alt="Rapid Prototyping" className="fdb-icon" src="Rapid.svg" />
          <h3 className="text-left"><strong>Hosted MVP</strong><br />Focus on your app logic rather than infrastructure</h3>
          <p className="text-left">For blockchain builders who are looking to build on distributed ledgers, DappBot provides a working MVP foundation and rock-solid deployment infrastructure.</p>
        </div>
        <div className="col-12 col-sm-4 pt-4 pt-sm-0">
          <img alt="Educational Tool" className="fdb-icon" src="Edu.svg" />
          <h3 className="text-left"><strong>Rapid Prototyping</strong><br />Decrease DevOps for your Dapps to zero</h3>
          <p className="text-left">If you are exploring smart contract use-cases, or need to generate live demos for client pitches, we help you dramatically cut iteration time and reduce DevOps effort to zero.</p>
        </div>
      </div>
    </div>
  </section>
)

export default Applications;