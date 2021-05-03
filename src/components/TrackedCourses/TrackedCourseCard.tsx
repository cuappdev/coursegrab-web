import React from 'react'

import './TrackedCourseCard.css'

import { Section, Status } from '../../types'
import { untrackSection } from '../../utils/requests';

export interface TrackedCourseCardProps {
  section: Section
  untrackSectionHandler: (courseId: number) => void
}

const TrackedCourseCard: React.FunctionComponent<TrackedCourseCardProps> = ({
  section,
  untrackSectionHandler
}) => {

  const untrackClicked = async () => {
    try {
      const data = await untrackSection(section.catalogNum)
      if (data) {
        untrackSectionHandler(section.catalogNum)
      }
    } catch (err) {
      console.log(err)
    }
  }

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
      <div className="title-status-view">
        <p className="title-label">{section.title}</p>
        <div className="status-icon">
          {statusIcon(section.status)}
        </div>
      </div>
      <div className="course-info-view">
        <p className="section-label">{section.section}</p>
        <p className="catalog-num-label">{section.catalogNum}</p>
        <p className="mode-label">{section.mode}</p>
      </div>
      <div className="action-buttons">
        <button className="remove-button" onClick={untrackClicked}>REMOVE</button>
        {
          section.status === Status.OPEN
            ? <a className="enroll-button" href="https://studentcenter.cornell.edu">ENROLL</a>
            : null
        }
      </div>
    </div >
  )
}

export default TrackedCourseCard
