import React from 'react';

import './TrackedCoursesView.css';

class TrackedCoursesView extends React.Component {
  render() {
    return (
      <div className="tracked-courses-view">
        <div className="container">
          <h2>Currently Tracked Courses</h2>
          <hr />
          <p>You’re not tracking any courses! Add courses using the search bar above, and they’ll appear in this table.</p>
        </div>
      </div>
    );
  };
}

export default TrackedCoursesView;
