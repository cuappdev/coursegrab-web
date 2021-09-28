import React from 'react'

import './DetailCourseCardCell.css'

import { Section, Status } from '../../types'

export interface DetailSectionCellProps {
  section: Section
}

const DetailSection: React.FunctionComponent<DetailSectionCellProps> = ({
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
    <div className="detail-section" >
      {statusIcon(section.status)}
      <p className="description-label">{section.section}</p>
      {
        section.isTracking
          ? <button className="remove-button">REMOVE</button>
          : <button className="track-button">TRACK</button>
      }
      <p className="emoji-icon">🙋🏾‍♀️</p>
      <p className="num-tracking-label">{section.numTracking + " students are tracking this section"}</p>
      <p className="emoji-icon">👀</p>
      <p className="detail-cell-mode-label">{section.mode}</p>
    </div >
  )
}

export default DetailSection
