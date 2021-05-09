import React from 'react'

import './DetailCourseView.css'

import { Course, Section } from '../../types'

import DetailSectionCard from './DetailCourseCard'

export interface DetailCourseViewProps {
    course: Course
}

const partition = (arr: Section[], condition: any) => {
    const pass = arr.filter(el => condition(el))
    const fail= arr.filter(el => !condition(el))
    return [pass, fail]
}

const DetailCourseView: React.FunctionComponent<DetailCourseViewProps> = ({
    course
}) => {
    var cards: JSX.Element[] = []
    var [pass, fail] = partition(course.sections, (s: Section) => s.section.substring(0, 3) == "LEC")
    if (pass.length > 0) {
        cards.push(<DetailSectionCard sectionType="Lecture" sections={pass}/>)
    }
    [pass, fail] = partition(fail, (s: Section) => s.section.substring(0, 3) == "DIS");
    if (pass.length > 0) {
        cards.push(<DetailSectionCard sectionType="Section" sections={pass}/>)
    }
    [pass, fail] = partition(fail, (s: Section) => s.section.substring(0, 3) == "LAB");
    if (pass.length > 0) {
        cards.push(<DetailSectionCard sectionType="Lab" sections={pass}/>)
    }
    if (fail.length > 0) {
        cards.push(<DetailSectionCard sectionType="Lab" sections={fail}/>)
    }
    return (
        <div className="detail-course-view">
            <p className="title-label">{course.title}</p>
            <div className="section-cards" >
                {cards}
            </div>
        </div >
    )
}

export default DetailCourseView