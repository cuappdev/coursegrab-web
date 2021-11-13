export enum Status {
    CLOSED = "CLOSED",
    OPEN = "OPEN",
    WAITLISTED = "WAITLISTED"
}

export interface Section {
    catalogNum: number
    courseNum: number
    instructors: string[]
    isTracking: boolean
    mode: string
    numTracking: number
    section: string
    status: Status
    subjectCode: string
    title: string
}

export interface Sections {
    sections: Section[]
}

export interface CourseQuery {
    courses: Course[]
    query: string
}

export interface Course {
    id: number
    courseNum: number
    subjectCode: string
    sections: Section[]
    title: string
}

export interface SessionAuthorization {
    notification: string
    sessionExpiration: number
    sessionToken: string
    updateToken: string
}

export interface User {
    email: string
    name: string
    id: string
    sessionAuthorization: SessionAuthorization
}
