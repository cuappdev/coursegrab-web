import React from 'react'

import './TrackedCoursesView.css'

import { Section, Status } from '../../types'

import TrackedCourseCard from './TrackedCourseCard'

class TrackedCoursesView extends React.Component {
  state = {
    availableSections: [
      {
        catalogNum: 1111,
        courseNum: 1000,
        instructors: [],
        isTracking: true,
        mode: 'Asynchronous',
        numTracking: 5,
        section: 'LEC 001 / TR 12:20pm - 1:10pm',
        status: Status.OPEN,
        subjectCode: 'INFO',
        title: 'INFO 1300: Introduction to Web Design'
      }
    ],
    awaitingSections: [
      {
        catalogNum: 1000,
        courseNum: 1000,
        instructors: [],
        isTracking: true,
        mode: 'Asynchronous',
        numTracking: 5,
        section: 'LEC 001 / TR 12:20pm - 1:10pm',
        status: Status.WAITLISTED,
        subjectCode: 'INFO',
        title: 'INFO 1300: Introduction to Web Design'
      },
      {
        catalogNum: 1234,
        courseNum: 1000,
        instructors: [],
        isTracking: true,
        mode: 'Asynchronous',
        numTracking: 5,
        section: 'LEC 001 / TR 12:20pm - 1:10pm',
        status: Status.CLOSED,
        subjectCode: 'INFO',
        title: 'INFO 1300: Introduction to Web Design'
      }
    ]
  }

  render() {
    const availableSectionsView = this.state.availableSections.map(section => {
      return (
        <TrackedCourseCard section={section} />
      )
    })
    const awaitingSections = this.state.awaitingSections.map(section => {
      return (
        <TrackedCourseCard section={section} />
      )
    })
    const sections = () => {
      if (this.state.availableSections.length > 0 && this.state.awaitingSections.length > 0) {
        return (
          <div>
            {availableSectionsView}
            {awaitingSections}
          </div>
        )
      } else {
        return (
          <div>
            <svg height="70" width="70">
              <circle cx="35" cy="35" r="35" fill="#47C753" />
            </svg>
            <p className="tracking-title-label">No Courses Currently Tracked</p>
            <p className="tracking-subtitle-label">Tap the search icon to start adding courses</p>
          </div>
        )
      }
    }
    return (
      <div className="tracked-courses-view">
        {sections()}
      </div>
    )
  }
}

export default TrackedCoursesView
