export enum Status {
    CLOSED,
    OPEN,
    WAITLISTED
}

export interface Section {
    catalogNum: number;
    courseNum: number;
    instructors: string[];
    isTracking: boolean;
    mode: string;
    numTracking: number;
    section: number;
    status: Status;
    subjectCode: string;
    title: string;
}

export interface Course {
    courseNum: number;
    subjectCode: string;
    sections: Section[];
    title: string;
}

export interface SessionAuthorization {
    sessionExpiration: Date;
    sessionToken: string;
    updateToken: string;
}

export interface User {
    email: string;
    name: string;
    id: string;
    sessionAuthorization: SessionAuthorization;
}
