import React from 'react'

import './DetailCourseCardCell.css'

import { Section, Status } from '../../types'
import { trackSection, untrackSection } from '../../utils/requests';

export interface DetailCourseCardCellProps {
  section: Section
}

const DetailSectionRow: React.FunctionComponent<DetailCourseCardCellProps> = ({
  section
}) => {

  const trackButtonClicked = async () => {
    try {
      const data = await trackSection(section.catalogNum)
      if (data) {
        section = data
      }
    } catch (err) {
      console.log(err)
    }
  }

  const removeButtonClicked = async () => {
    try {
      const data = await untrackSection(section.catalogNum)
      if (data) {
        section = data
      }
    } catch (err) {
      console.log(err)
    }
  }

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
    <div className="detail-section" >
      {statusIcon(section.status)}
      <p className="description-label">{section.section}</p>
      {
          section.isTracking
          ? <button className="cell-remove-button" onClick={removeButtonClicked}>REMOVE</button>
          : <button className="cell-track-button" onClick={trackButtonClicked}>TRACK</button>
      }
      <p className="emoji-icon">🙋🏾‍♀️</p>
      <p className="num-tracking-label">{section.numTracking + "50 students are tracking this section"}</p>
      <p className="emoji-icon">👀</p>
      <p className="modality-label">{section.mode}</p>
    </div >
  )
}

export default DetailSectionRow
