import React from 'react'

import './TrackedCourseCard.css'

class TrackedCourseCard extends React.Component {

  openIcon = (
    <svg height="16" width="16">
      <circle cx="8" cy="8" r="8" fill="#47C753" />
    </svg>
  )

  closedIcon = (
    <svg height="16" width="16">
      <rect width="16" height="16" fill="#CA4238" />
    </svg>
  )

  waitlistedIcon = (
    <svg height="16" width="16">
      <polygon points="0,16 8,0 16,16" fill="#FFD027" />
    </svg>
  )

  render() {
    return (
      <div className="tracked-course-card">
        {this.openIcon}
        {this.closedIcon}
        {this.waitlistedIcon}
        <h3>INFO 1300: Introduction to Web Design</h3>
        <p>LEC 001 / W 7:30PM</p>
        <p>1389</p>
        <p>In Person With Transition</p>
        <button>Remove</button>
        <button>Enroll</button>
      </div>
    )
  }
}


export default TrackedCourseCard
