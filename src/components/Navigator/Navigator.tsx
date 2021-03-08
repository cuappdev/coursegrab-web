import React from 'react';

import './Navigator.css';

class Navigator extends React.Component {
  render() {
    return (
      <div className="header-view">
        <a href="/">CourseGrab</a>
        <a href="/">Sign In</a>
      </div>
    );
  };
}

export default Navigator;