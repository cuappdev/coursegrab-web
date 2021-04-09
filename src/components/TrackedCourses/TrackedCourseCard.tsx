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
          <svg className="status-icon" height="16" width="16">
            <circle cx="8" cy="8" r="8" fill="#47C753" />
          </svg>
        )
      case Status.CLOSED:
        return (
          <svg className="status-icon" height="16" width="16">
            <rect width="16" height="16" fill="#CA4238" />
          </svg>
        )
      case Status.WAITLISTED:
        return (
          <svg className="status-icon" height="16" width="16">
            <polygon points="0,16 8,0 16,16" fill="#FFD027" />
          </svg>
        )
    }

  }
  return (
    <div className="tracked-course-card" >
      <div className="title-status-view">
        <p className="title-label">{section.title}</p>
        {statusIcon(section.status)}
      </div>
      <div className="course-info-view">
        <p className="section-label">{section.section}</p>
        <p className="catalog-num-label">{section.catalogNum}</p>
        <p className="mode-label">{section.mode}</p>
      </div>
      <div className="action-buttons">
        <button className="remove-button" >REMOVE</button>
        {
          section.status === Status.OPEN
            ? <button className="enroll-button">ENROLL</button>
            : null
        }
      </div>
    </div >
  )
}



export default TrackedCourseCard
