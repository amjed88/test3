import { createContext } from 'react'

export const initState = {
    token: '',
    isLogin: false,
    username: ''
}

export const appContext = createContext()