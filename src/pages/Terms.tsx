import React, { FC } from 'react';
import { RouteComponentProps } from '@reach/router';


export const Terms:FC<RouteComponentProps> = (props) => {
  var iframeStyle = {
    width: '100%',
    minHeight: '100vh',
  };

  return (
    <section className="fdb-block" id="privacy">
        <div className="container">
          <h1>DappBot Terms of Use</h1>
          <p className="lead">Information about DappBot Terms of Use can be found here.</p>
          <hr />
          <br />
          <iframe src="https://drive.google.com/file/d/1iQd597CTQ-gl0mFkhjuQiC5Rkt8t-cwL/preview" style={iframeStyle} allowFullScreen></iframe>
        </div>
    </section>
  )
}

export default Terms;