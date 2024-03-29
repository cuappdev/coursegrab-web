import React from 'react'
import './TrackedCoursesView.css'
import { getAllTrackedSections } from '../../utils/requests';
import { Section, Sections, Status } from '../../types'
import TrackedCourseCard from './TrackedCourseCard'

type TrackedCoursesViewState = {
  availableSections: Section[]
  awaitingSections: Section[]
}

class TrackedCoursesView extends React.Component {
  state: TrackedCoursesViewState = {
    availableSections: [],
    awaitingSections: []
  }

  componentDidMount() {
    this.getTrackedSections()
  }

  getTrackedSections = async () => {
    try {
      const data: Sections = await getAllTrackedSections()
      const available = data.sections.filter(section => section.status === Status.OPEN)
      const awaiting = data.sections.filter(section => section.status !== Status.OPEN)
      this.setState({
        availableSections: available,
        awaitingSections: awaiting
      })
    } catch (err) {
      console.log(err)
    }
  }

  updateSections = async (courseId: number) => {
    const updatedAvailableSections = this.state.availableSections.filter(section => section.catalogNum !== courseId)
    const updatedAwaitingSections = this.state.awaitingSections.filter(section => section.catalogNum !== courseId)
    this.setState({
      availableSections: updatedAvailableSections,
      awaitingSections: updatedAwaitingSections
    })
  }

  render() {
    const availableSectionsView = this.state.availableSections.map(section => {
      return (
        <TrackedCourseCard
          key={section.catalogNum}
          section={section}
          untrackSectionHandler={(courseId) => this.updateSections(courseId)}
        />
      )
    })
    const awaitingSections = this.state.awaitingSections.map(section => {
      return (
        <TrackedCourseCard
          key={section.catalogNum}
          section={section}
          untrackSectionHandler={courseId => this.updateSections(courseId)}
        />
      )
    })
    const sections = () => {
      if (this.state.availableSections.length > 0 || this.state.awaitingSections.length > 0) {
        return (
          <div>
            <p className="num-available-label">{`${this.state.availableSections.length} Available`}</p>
            <div className="all-tracked-courses">
              {availableSectionsView}
            </div>
            <p className="num-awaiting-label">{`${this.state.awaitingSections.length} Awaiting`}</p>
            <div className="all-tracked-courses">
              {awaitingSections}
            </div>
          </div >
        )
      } else {
        return (
          <div className="no-tracked-course">
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
