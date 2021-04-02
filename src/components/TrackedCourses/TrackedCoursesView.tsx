import React from 'react'

import './TrackedCoursesView.css'

import TrackedCourseCard from './TrackedCourseCard'

class TrackedCoursesView extends React.Component {
  render() {
    return (
      <div className="tracked-courses-view">
        <TrackedCourseCard />
        <svg height="70" width="70">
          <circle cx="35" cy="35" r="35" fill="#47C753" />
        </svg>
        <p className="tracking-title-label">No Courses Currently Tracked</p>
        <p className="tracking-subtitle-label">Tap the search icon to start adding courses</p>
      </div>
    )
  }
}

export default TrackedCoursesView
