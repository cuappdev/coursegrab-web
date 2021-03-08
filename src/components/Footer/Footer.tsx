import React from 'react';

import './Footer.css';

class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <p>
          Originally created by Ning Ning Sun and Chase Thomas in 2016. Currently maintained by <a href="https://cornellappdev.com">Cornell AppDev.</a>
        </p>
      </div>
    );
  };
}

export default Footer;