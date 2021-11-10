import { AxiosResponse } from 'axios';
import { hostUrl } from './constants';
import { camelizeKeys, decamelizeKeys } from 'humps'

const axios = require('axios').default

const api = axios.create({
    baseURL: hostUrl + '/api/'
})

api.interceptors.response.use((response: AxiosResponse) => {
    if (
        response.data &&
        response.headers['content-type'] === 'application/json'
    ) {
        response.data = camelizeKeys(response.data);
    }
    return response;
});

const get = async (url: string, params?: any) => {
    const res = await api.get(url, params)
    const { success, data } = res.data
    if (success) return data
    throw Error(data)
}

const post = async (url: string, body?: any, headers?: any) => {
    const res = await api.post(url, body, headers)
    const { success, data } = res.data
    if (success) return data
    throw Error(data)
}

const standardHeader = () => {
    const userJson = localStorage.getItem('user')
    if (userJson == null) {
        return {}
    }
    else {
        const user = JSON.parse(userJson)
        return {
            headers: { Authorization: `Bearer ${user.sessionAuthorization.sessionToken}` }
        }
    }
}

export const validateToken = async () => {
    const userJson = localStorage.getItem('user')
    if (userJson == null) {
        // initialize session 
    }
    else {
        const user = JSON.parse(userJson)
        if (user.sessionAuthorization.sessionExpiration <= Date.now()) {
            updateSession()
            // reset local storage information
        }
    }
}

export const initializeSession = async (token: string, givenName: string, familyName: string) => {
    const body = {
        token,
        deviceType: "WEB",
        deviceToken: null,
        givenName,
        familyName
    }
    return await post(`/session/initialize/v2/`, decamelizeKeys(body))
}

export const updateSession = async () => await post(`/session/update/`)

export const getAllTrackedSections = async () => await get(`/users/tracking/`, standardHeader())

export const searchCourses = async (query: string) => await post(`/courses/search/`, { query: query }, standardHeader())

export const getCourseById = async (courseId: number) => await get(`/courses/${courseId}`, standardHeader())

export const trackSection = async (courseId: number) => await post(`/sections/track/`, { course_id: courseId }, standardHeader())

export const untrackSection = async (courseId: number) => await post(`/sections/untrack/`, { course_id: courseId }, standardHeader())

export const setNotificationMode = async () => { }
