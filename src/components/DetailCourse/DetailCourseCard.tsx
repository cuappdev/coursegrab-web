import React from 'react'

import './DetailCourseCard.css'

import { Section } from '../../types'

import DetailSection from './DetailCourseSectionCell'

export interface DetailSectionCardProps {
    sectionType: string
    sections: Section[]
}

const DetailSectionCard: React.FunctionComponent<DetailSectionCardProps> = ({
    sectionType,
    sections
}) => {
    return (
        <div className="sections-card">
            <p className="bucket-label">{sectionType}</p>
            <div className="section-cells" >
                {
                    sections.map(section => {
                        return (
                            <DetailSection section={section} />
                        )
                    })
                }
            </div>
        </div >
    )
}

export default DetailSectionCard