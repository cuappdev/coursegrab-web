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

const get = async (url: string, headers?: any, params?: any) => {
    const res = await api.get(url, params, headers)
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

export const setAuthHeader = (token: string | null) => {
    const header = `Bearer ${token ? token : localStorage.getItem('accessToken')}`
    axios.defaults.headers.common['Authorization'] = header
}

export const validateToken = async () => { }

export const initializeSession = async () => { }

export const updateSession = async () => { }

export const getAllTrackedSections = async () => await get(`/users/tracking/`)

export const searchCourses = async (query: string) => {
    const data = await post(`/courses/search/`, { query: query })
    return data
}

export const trackSection = async () => { }

export const untrackSection = async (courseId: number) => await post(`/sections/untrack/`, { course_id: courseId })

export const setNotificationMode = async () => { }
