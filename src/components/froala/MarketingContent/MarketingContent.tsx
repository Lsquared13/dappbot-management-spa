import React from 'react';
import './../bootstrap.min.css';
import './../froala_blocks.min.css';


const MarketingContent = () => {
  return (
    <div>
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
              <h3 className="text-left"><strong>Educational Tool</strong><br/>Spend your time on smart contracts rather than web apps</h3>
              <p className="text-left">Whether you’re learning about smart contracts or participating a Hackathon want an interface, but don’t want to spend time creating a front-end for your Dapps. We can get you a responsive Dapp infterface in five minutes.</p>
            </div>
            <div className="col-12 col-sm-4 pt-4 pt-sm-0">
              <img alt="Rapid Prototyping" className="fdb-icon" src="Rapid.svg" />
              <h3 className="text-left"><strong>Hosted MVP</strong><br/>Focus on your app logic rather than infrastructure</h3>
              <p className="text-left">For blockchain builders who are looking to build on distributed ledgers, DappBot provides a working MVP foundation and rock-solid deployment infrastructure.</p>
            </div>
            <div className="col-12 col-sm-4 pt-4 pt-sm-0">
              <img alt="Educational Tool" className="fdb-icon" src="Edu.svg" />
              <h3 className="text-left"><strong>Rapid Prototyping</strong><br/>Decrease DevOps for your Dapps to zero</h3>
              <p className="text-left">If you need generate live demos for client pitch or would like to explore the best smart contract use-cases, we help you dramatically cut iteration time and reduce DevOps effort to zero.</p>
            </div>
          </div>
        </div>
      </section>

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
                  <p>Save thousands of hours in prototyping your first blockchain application and ongoing DevOps effort through three steps and five minutes.</p>
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

      <section className="fdb-block fp-active" data-block-type="contents" id="learn">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 text-center">
              <h1>How it works?</h1>
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


      <section className="fdb-block" style={{ background: '#257edc' }} data-block-type="forms" data-id={13}>
        <div className="container">
          <div className="fdb-box">
            <div className="row justify-content-center align-items-center">
              <div className="col-12 col-lg-6">
                <h2>The DappBot Newsletter</h2>
                <p className="lead">Stay up-to-date with DappBot updates and more.</p>
              </div>
              <div className="col-12 col-lg-5 text-center" id="mc_embed_signup">
                <form action={process.env.REACT_APP_MAILCHIMP_URL} method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate>
                  <div id="mc_embed_signup_scroll input-group mt-4" style={{ display: "flex", flexDirection: "row", }}>
                    <input type="email" name="EMAIL" placeholder="Enter your email address" className="required email form-control" id="mce-EMAIL" style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0, }} />
                    <div className="clear input-group-append">
                      <input type="submit" defaultValue="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="button btn btn-primary" style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0, }} />
                    </div>
                    <div id="mce-responses" className="clear">
                      <div className="response" id="mce-error-response" style={{ display: 'none' }} />
                      <div className="response" id="mce-success-response" style={{ display: 'none' }} />
                    </div>    {/* real people should not fill this in and expect good things - do not remove this or risk form bot signups*/}
                    <div style={{ position: 'absolute', left: '-5000px' }}><input type="text" name={process.env.REACT_APP_MAILCHIMP_AUDIENCE_ID} tabIndex={-1} /></div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default MarketingContent;