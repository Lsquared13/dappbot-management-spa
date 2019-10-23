import React from 'react';

export const Features = () => (
  <section className="fdb-block" data-block-type="contents" id="features">
    <div className="container">
      <div className="row text-left">
        <div className="col-10 col-sm-6 m-auto m-lg-0 col-lg-4 text-center">
          <img alt="Development SDK" className="img-fluid" src="SDK.svg" />
        </div>
        <div className="col-12 col-lg-7 offset-lg-1 pt-4 pt-lg-0">
          <h1>Why DappBot?</h1>
          <p className="lead">DappBot solutions generate thousands of lines of boilerplate code so that you can focus your blockchain efforts on creating value for your business:</p>
          <div className="row mt-5"></div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-12 col-sm-4">
          <h3><strong>Speed</strong></h3>
          <p>Save thousands of hours in prototyping your first blockchain application and ongoing DevOps effort with three steps and five minutes.</p>
        </div>
        <div className="col-12 col-sm-4 pt-3 pt-sm-0">
          <h3><strong>Scalability</strong></h3>
          <p>Eliminate all scaling concerns by instantly deploying your blockchain application to 165 hosts around the world.</p>
        </div>
        <div className="col-12 col-sm-4">
          <h3><strong>Simplicity</strong></h3>
          <p>Simplify your ongoing development experience by deploying via GitHub branches, just like working with Pages. <small>(Shipping Soon)</small></p>
        </div>
      </div>


    </div>
  </section>
)