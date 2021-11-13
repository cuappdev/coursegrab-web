import { AxiosResponse } from 'axios';
import { hostUrl } from './constants';
import { camelizeKeys, decamelizeKeys } from 'humps'

import { User } from '../types'

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

const getCurrentUser = () => {
    const userJson = localStorage.getItem('user')
    if (userJson != null) {
        try {
            return JSON.parse(userJson)
        } catch (err) {
            console.log(err)
            return null
        }
    }
    return null
}

const standardHeaders = () => {
    const user: User = getCurrentUser()
    return user ? { headers: { Authorization: `Bearer ${user.sessionAuthorization.sessionToken}` } } : {}
}

const updateHeaders = () => {
    const user: User = getCurrentUser()
    return user ? { headers: { Authorization: `Bearer ${user.sessionAuthorization.updateToken}` } } : {}
}

// Updates user session when the current session expires
const refreshToken = async () => {
    const user: User = getCurrentUser()
    if (user != null && user.sessionAuthorization.sessionExpiration <= Math.floor(Date.now() / 1000)) {
        try {
            const session = await updateSession()
            const loggedInUser = {
                email: user.email,
                name: user.name,
                id: user.id,
                sessionAuthorization: session,
            }
            localStorage.setItem('user', JSON.stringify(loggedInUser))
        } catch (err) {
            console.log(err)
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

export const updateSession = async () => await post(`/session/update/`, {}, updateHeaders())

export const getAllTrackedSections = async () => {
    await refreshToken()
    return await get(`/users/tracking/`, standardHeaders())
}

export const searchCourses = async (query: string) => {
    await refreshToken()
    return await post(`/courses/search/`, { query: query }, standardHeaders())
}

export const getCourseById = async (courseId: number) => {
    await refreshToken()
    return await get(`/courses/${courseId}`, standardHeaders())
}

export const trackSection = async (courseId: number) => {
    await refreshToken()
    return await post(`/sections/track/`, { course_id: courseId }, standardHeaders())
}

export const untrackSection = async (courseId: number) => {
    await refreshToken()
    return await post(`/sections/untrack/`, { course_id: courseId }, standardHeaders())
}

export const setNotificationMode = async () => { }
