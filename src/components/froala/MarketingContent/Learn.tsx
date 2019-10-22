import React from 'react';

export const Learn = () => (
  <section className="fdb-block fp-active" data-block-type="contents" id="learn">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 text-center">
          <h1>How does it work?</h1>
          <p className="lead">Three simple steps to deploy your Dapp from only a contract ABI.</p>
        </div>
      </div>
      <div className="row align-items-center mt-5 mb-5">
        <div className="col-12 col-md-6 col-lg-5">
          <h2>Create Dapp</h2>
          <p className="">Quicky generate a Dapp by choosing a name and plugging in your ABI, contract address, and deployed network (Eximchain or Ethereum).</p>
        </div>
        <div className="col-12 col-md-6 ml-md-auto mt-4 mt-md-0">
          <img alt="image" className="img-fluid" src="create.png" />
        </div>
      </div>

      <div className="row align-items-center mt-5 mb-5">
        <div className="col-12 col-md-6 col-lg-5 order-md-2">
          <h2>Deploy Dapp</h2>
          <p className="">Deploy your Dapp with an automatically configured scalable infrastructure which guarantees rapid responses by caching your application in 165 locations around the world.</p>
        </div>
        <div className="col-12 col-md-6 mr-md-auto mt-4 mt-md-0 order-md-1">
          <img alt="image" className="img-fluid" src="deploy.png" />
        </div>
      </div>

      <div className="row align-items-center mt-5 mb-5">
        <div className="col-12 col-md-6 col-lg-5">
          <h2>Manage Dapps</h2>
          <p className="">Manage your Dapps from one dashboard. Launch new Dapps and see details about your existing ones, all in one place.</p>
        </div>
        <div className="col-12 col-md-6 ml-md-auto mt-4 mt-md-0">
          <img alt="image" className="img-fluid" src="manage.png" />
        </div>
      </div>

      <div className="row align-items-center mt-5 mb-5">
        <div className="col-12 col-md-6 col-lg-5 order-md-2">
          <h2>Launch Dapp</h2>
          <p className="">In five minutes you have deployed a decentralized application. Launch your new app to interact with your smart contract through a simple, elegant, and responsive web interface.</p>
        </div>
        <div className="col-12 col-md-6 mr-md-auto mt-4 mt-md-0 text-center order-md-1">
          <img alt="image" className="img-fluid" src="launch.svg" />
        </div>
      </div>


    </div>
  </section>
)

export default Learn;