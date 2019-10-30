import React from 'react';

export const Newsletter = () => (
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
)

export default Newsletter;