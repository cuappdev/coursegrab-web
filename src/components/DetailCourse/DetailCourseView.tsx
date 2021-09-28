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

const partition = (arr: Section[], condition: any) => {
    const pass = arr.filter(el => condition(el))
    const fail = arr.filter(el => !condition(el))
    return [pass, fail]
}

class DetailCourseView extends React.Component<DetailCourseViewProps> {

    state: TrackedCoursesViewState = {
        lecSections: [],
        disSections: [],
        labSections: [],
        otherSections: [],
    }

    componentDidMount() {
        this.filterSections(this.props.location.state.sections)
    }

    filterSections(sections: Section[]) {
        const lecSections = []
        const disSections = []
        const labSections = []
        const otherSections = []
        for (let i = 0; i < sections.length; i++) {
            switch (sections[i].section.substring(0, 3)) {
                case "LEC":
                    lecSections.push(sections[i].section)
                    break
                case "DIS":
                    disSections.push(sections[i].section)
                    break
                case "LAB":
                    labSections.push(sections[i].section)
                    break
                default:
                    otherSections.push(sections[i].section)
            }
        }
        this.setState({
            lecSections: lecSections,
            disSections: disSections,
            labSections: labSections,
            otherSections: otherSections
        })
    }

    render() {
        const cards = () => {
            const cards: JSX.Element[] = []
            if (this.state.lecSections.length > 0) {
                cards.push(<DetailSectionCard sectionType="Lecture" sections={this.state.lecSections} />)
            } else if (this.state.disSections.length > 0) {
                cards.push(< DetailSectionCard sectionType="Section" sections={this.state.disSections} />)
            } else if (this.state.labSections.length > 0) {
                cards.push(< DetailSectionCard sectionType="Lab" sections={this.state.labSections} />)
            } else {
                cards.push(<DetailSectionCard sectionType="Other" sections={this.state.otherSections} />)
            }
            return cards
        }
        return (
            <div className="detail-course-view">
                <p className="detail-course-view-title-label">{this.props.location.state.title}</p>
                <div className="section-cards" >
                    {cards()}
                </div>
            </div >
        )
    }
}

export default DetailCourseView
