import React from 'react';
import './../bootstrap.min.css';
import './../froala_blocks.min.css';
import { navigate } from '@reach/router';

const Content = () => (
  <div>
  <section className="fdb-block" data-block-type="features" data-id={3}>
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 text-center">
          <h1>DappBot Applications</h1>
        </div>
      </div>
      <div className="row text-center mt-5">
        <div className="col-12 col-sm-4">
          <img alt="image" className="fdb-icon" src="Hosted.svg" />
          <h3><strong>Hosted MVP</strong></h3>
          <p>Many startups and individual developers are looking to build on distributed ledgers but are not themselves blockchain experts. DappBot provides a working MVP foundation and rock-solid deployment infrastructure.</p>
        </div>
        <div className="col-12 col-sm-4 pt-4 pt-sm-0">
          <img alt="image" className="fdb-icon" src="Rapid.svg" />
          <h3><strong>Rapid Prototyping</strong></h3>
          <p>Whether you’re a Blockchain Solution Provider need to constantly generate live demos for client pitch or Enterprise Blockchain R&D team still exploring the best smart contract use-cases. We help you dramatically cut iteration time and reduce DevOps effort to zero.</p>
        </div>
        <div className="col-12 col-sm-4 pt-4 pt-sm-0">
          <img alt="image" className="fdb-icon" src="Edu.svg" />
          <h3><strong>Education &amp; Training</strong></h3>
          <p>Whether you’re developers learning about smart contracts or participating a Hackathon want an interface, but don’t want to waste time writing web apps. We can get them a Dapp in five minutes flat.</p>
        </div>
      </div>
      <div className="row mt-5 justify-content-center">
        <div className="col-8">
          <img alt="image" className="img-fluid" src="Developer.svg" />
        </div>
      </div>
    </div>
  </section>
  <section className="fdb-block" data-block-type="contents" data-id={4}>
    <div className="container">
      <div className="row text-left">
        <div className="col-10 col-sm-6 m-auto m-lg-0 col-lg-4">
          <img alt="image" className="img-fluid" src="SDK.svg" />
        </div>
        <div className="col-12 col-lg-7 offset-lg-1 pt-4 pt-lg-0">
          <h1>DappBot Solutions</h1>
          <p className="lead">DappBot empowers you to immediately make smart contracts usable by anybody with a browser.  We generate thousands of lines of boilerplate code so that you can focus your blockchain efforts on creating value for your business.</p>
          <div className="row mt-5">
            <div className="col-12 col-sm-6">
              <h3><strong>Speed</strong></h3>
              <p className="lead">Make a hypothesis about what your MVP smart contract needs and start testing it with end-users within 5 minutes.</p>
            </div>
            <div className="col-12 col-sm-6 pt-3 pt-sm-0">
              <h3><strong>Scalability</strong></h3>
              <p className="lead">Automatically configure scalable infrastructure which guarantees rapid responses by caching the application in 165 locations around the world.</p>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-12 col-sm-6">
              <h3><strong>Customization</strong></h3>
              <p className="lead">Pick a custom subdomain, and edit your Dapp by simply updating a GitHub branch – just like working with Pages.</p>
            </div>
            <div className="col-12 col-sm-6 pt-3 pt-sm-0">
              <h3><strong>Multi-Dapp Organizations</strong></h3>
              <p className="lead">Managed organization accounts and your own multi-dapp endpoint.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="fdb-block fp-active" style={{background: '#f0f6fd', display: "none",}} data-block-type="pricings" data-id={14}>
    <div className="container">
      <div className="row text-center">
        <div className="col">
          <h1>Pricing Plans</h1>
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
            <p className="text-center pt-4"><a href="" className="btn btn-outline-dark">Coming Soon</a></p>
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
            <p className="text-center pt-4"><a href="" className="btn btn-primary btn-shadow">Choose Plan</a></p>
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
            <p className="text-center pt-4"><a href="" className="btn btn-outline-dark">Coming Soon</a></p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="fdb-block" style={{background: '#257edc'}} data-block-type="forms" data-id={13}>
    <div className="container">
      <div className="fdb-box">
        <div className="row justify-content-center align-items-center">
          <div className="col-12 col-lg-6">
            <h2>The DappBot Newsletter</h2>
            <p className="lead">Stay up-to-date with DappBot updates and more.</p>
          </div>

          <div className="col-12 col-lg-5 text-center" id="mc_embed_signup">

            <form action="https://eximchain.us20.list-manage.com/subscribe/post?u=bcabb5ebaaec9e5f833f9d760&id=0bdb65877c" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate>
              <div id="mc_embed_signup_scroll input-group mt-4" style={{display: "flex", flexDirection: "row",}}>
                <input type="email" name="EMAIL" placeholder="Enter your email address" className="required email form-control" id="mce-EMAIL" style={{borderTopRightRadius: 0, borderBottomRightRadius: 0,}} />
                <div className="clear input-group-append">
                  <input type="submit" defaultValue="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="button btn btn-primary" style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0,}}/>
                </div>
                <div id="mce-responses" className="clear">
                  <div className="response" id="mce-error-response" style={{display: 'none'}} />
                  <div className="response" id="mce-success-response" style={{display: 'none'}} />
                </div>    {/* real people should not fill this in and expect good things - do not remove this or risk form bot signups*/}
                <div style={{position: 'absolute', left: '-5000px'}}><input type="text" name="b_bcabb5ebaaec9e5f833f9d760_0bdb65877c" tabIndex={-1} /></div>
              </div>
            </form>

          </div>


{/* 
          <div className="col-12 col-lg-5 text-center">
            <div className="input-group mt-4" style={{flexDirection: "row"}}>
              <input type="text" className="form-control" placeholder="Enter your email address" />
              <div className="input-group-append">
                <button className="btn btn-primary" type="button" style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0,}}>Submit</button>
              </div>
            </div>
          </div> */}

        </div>
      </div>
    </div>
  </section>
</div>
);

export default Content;