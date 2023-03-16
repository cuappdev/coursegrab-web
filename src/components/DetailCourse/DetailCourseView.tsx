import React from 'react'
import { RouteComponentProps } from "react-router-dom";
import './DetailCourseView.css'
import { Course, Section } from '../../types'
import { getCourseById } from '../../utils/requests';
import DetailSectionCard from './DetailCourseCard'

type TrackedCoursesViewState = {
    title: String,
    sections: Section[]
}

export interface DetailCourseViewProps extends RouteComponentProps<{ id: string }> {
    location: DetailCourseViewPropsLocation
    match: DetailCourseViewPropsMatch
}

export interface DetailCourseViewPropsLocation {
    state: Course,
    pathname: string,
    search: string,
    hash: string
}

export interface DetailCourseViewPropsMatch {
    params: DetailCourseViewPropsMatchParams,
    isExact: boolean,
    path: string,
    url: string
}

export interface DetailCourseViewPropsMatchParams {
    id: string
}

class DetailCourseView extends React.Component<DetailCourseViewProps> {

    state: TrackedCoursesViewState = {
        title: "",
        sections: []
    }

    async componentDidMount() {
        // check if there's a course in location state, else make a network request to get course by id
        try {
            const course: Course = this.props.location.state
            this.setState({
                title: course.title,
                sections: course.sections
            })
        } catch {
            try {
                const course = await getCourseById(parseInt(this.props.match.params.id))
                this.setState({
                    title: course.title,
                    sections: course.sections
                })
            } catch (err) {
                console.log(err)
            }
        }
    }

    getSectionCards() {
        var sections = []
        try {
            const course: Course = this.props.location.state
            sections = course.sections
        } catch {
            sections = this.state.sections
        }

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

    getCourseTitle() {
        try {
            const course: Course = this.props.location.state
            return course.title
        } catch {
            return this.state.title
        }
    }

    render() {
        return (
            <div className="detail-course-view">
                <p className="detail-course-view-title-label">{this.getCourseTitle()}</p>
                <div className="section-cards">
                    {this.getSectionCards()}
                </div>
            </div>
        )
    }
}

export default DetailCourseView
