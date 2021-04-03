import React from 'react'

import './TrackedCourseCard.css'

import { Section, Status } from '../../types'

export interface TrackedCourseCardProps {
  section: Section
}

const TrackedCourseCard: React.FunctionComponent<TrackedCourseCardProps> = ({
  section
}) => {

  const statusIcon = (status: Status) => {
    switch (status) {
      case Status.OPEN:
        return (
          <svg height="16" width="16">
            <circle cx="8" cy="8" r="8" fill="#47C753" />
          </svg>
        )
      case Status.CLOSED:
        return (
          <svg height="16" width="16">
            <rect width="16" height="16" fill="#CA4238" />
          </svg>
        )
      case Status.WAITLISTED:
        return (
          <svg height="16" width="16">
            <polygon points="0,16 8,0 16,16" fill="#FFD027" />
          </svg>
        )
    }

  }
  return (
    <div className="tracked-course-card" >
      {statusIcon(section.status)}
      <h3>{section.title}</h3 >
      <p>{section.section}</p>
      <p>{section.catalogNum}</p>
      <p>{section.mode}</p>
      <button>Remove</button>
      <button>Enroll</button>
    </div >
  )
}



export default TrackedCourseCard
