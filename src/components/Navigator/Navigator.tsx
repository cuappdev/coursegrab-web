import React from 'react';

import './Navigator.css';

class Navigator extends React.Component {
  render() {
    return (
      <div className="nav-view">
        <div className="container">
          <a className="nav-left" href="/">CourseGrab</a>
          <a className="nav-right" href="/">Sign In</a>
        </div>
      </div>
    );
  };
}

export default Navigator;
