import React from 'react';

export const OldPricingTable = () => {
  return (
    <section className="fdb-block fp-active" style={{ background: '#f0f6fd', display: "none", }} data-block-type="pricings" data-id={14}>
      <div className="container">
        <div className="row text-center">
          <div className="col">
            <h1 id='pricing'>Pricing Plans</h1>
          </div>
        </div>
        <div className="row mt-5 align-items-center no-gutters">
          <div className="col-12 col-sm-10 col-md-8 m-auto col-lg-4 text-center shadow">
            <div className="bg-white pb-5 pt-5 pl-4 pr-4 rounded-left">
              <h2 className="font-weight-light">Basic</h2>
              <p className="h1 mt-5 mb-5"><strong>$19</strong> <span className="h4">/month</span></p>
              <ul className="text-left">
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
              </ul>
              <p className="text-center pt-4"><a href="#pricing" className="btn btn-outline-dark">Coming Soon</a></p>
            </div>
          </div>
          <div className="col-12 col-sm-10 col-md-8 ml-auto mr-auto col-lg-4 text-center mt-4 mt-lg-0 sl-1 pt-0 pt-lg-3 pb-0 pb-lg-3 bg-white fdb-touch rounded shadow">
            <div className="pb-5 pt-5 pl-4 pr-4">
              <h2 className="font-weight-light">Standard</h2>
              <p className="h1 mt-5 mb-5"><strong>$49</strong> <span className="h4">/month</span></p>
              <ul className="text-left">
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
              </ul>
              <p className="text-center pt-4"><a href="#pricing" className="btn btn-primary btn-shadow">Choose Plan</a></p>
            </div>
          </div>
          <div className="col-12 col-sm-10 col-md-8 ml-auto mr-auto col-lg-4 text-center mt-4 mt-lg-0 shadow">
            <div className="bg-white pb-5 pt-5 pl-4 pr-4 rounded-right">
              <h2 className="font-weight-light">OEM</h2>
              <p className="h1 mt-5 mb-5"><strong>$99</strong> <span className="h4">/month</span></p>
              <ul className="text-left">
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
              </ul>
              <p className="text-center pt-4"><a href="#pricing" className="btn btn-outline-dark">Coming Soon</a></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OldPricingTable;