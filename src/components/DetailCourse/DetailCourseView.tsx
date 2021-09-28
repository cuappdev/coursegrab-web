import React from 'react'

import './DetailCourseView.css'

import { Course, Section } from '../../types'

import DetailSectionCard from './DetailCourseCard'

type TrackedCoursesViewState = {
    lecSections: Section[]
    disSections: Section[]
    labSections: Section[]
    otherSections: Section[]
}

export interface DetailCourseViewProps {
    location: DetailCourseViewPropsLocation
}

export interface DetailCourseViewPropsLocation {
    state: Course
}

class DetailCourseView extends React.Component<DetailCourseViewProps> {

    getSectionCards(sections: Section[]) {
        const lecSections = []
        const disSections = []
        const labSections = []
        const otherSections = []
        for (let i = 0; i < sections.length; i++) {
            switch (sections[i].section.substring(0, 3)) {
                case "LEC":
                    lecSections.push(sections[i])
                    break
                case "DIS":
                    disSections.push(sections[i])
                    break
                case "LAB":
                    labSections.push(sections[i])
                    break
                default:
                    otherSections.push(sections[i])
            }
        }

        const cards: JSX.Element[] = []
        if (lecSections.length > 0) {
            cards.push(<DetailSectionCard sectionType="Lecture" sections={lecSections} />)
        }
        if (disSections.length > 0) {
            cards.push(< DetailSectionCard sectionType="Section" sections={disSections} />)
        }
        if (labSections.length > 0) {
            cards.push(< DetailSectionCard sectionType="Lab" sections={labSections} />)
        }
        if (otherSections.length > 0) {
            cards.push(<DetailSectionCard sectionType="Other" sections={otherSections} />)
        }
        return cards
    }

    render() {
        return (
            <div className="detail-course-view">
                <p className="detail-course-view-title-label">{this.props.location.state.title}</p>
                <div className="section-cards" >
                    {this.getSectionCards(this.props.location.state.sections)}
                </div>
            </div >
        )
    }
}

export default DetailCourseView
