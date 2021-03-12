import { hostUrl } from './constants';
import { camelizeKeys, decamelizeKeys } from 'humps'

const axios = require('axios').default

const api = axios.create({
    baseURL: hostUrl + '/api/',
    withCredentials: true
})

const get = async (url: string, headers?: any, params?: any) => {
    const res = await api.get(url, headers, params)
    const { success, data } = res.data
    if (success) return data
    throw Error(data)
}
  
const post = async (url: string, headers?: any, body?: any) => {
    const res = await api.post(url, headers, body)
    const { success, data } = res.data
    if (success) return data
    throw Error(data)
}

export const setAuthHeader = (token: string | null) => {
  const header = `Bearer ${token ? token : localStorage.getItem('accessToken')}`
  axios.defaults.headers.common['Authorization'] = header
}

export const validateToken = async () => {}

export const initializeSession = async () => {}

export const updateSession = async () => {}

export const getAllTrackedSections = async () => {}

export const searchCourse = async () => {}

export const trackSection = async () => {}

export const untrackSection = async () => {}

export const setNotificationMode = async () => {}
