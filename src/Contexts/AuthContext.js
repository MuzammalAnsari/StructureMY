import { onAuthStateChanged } from 'firebase/auth'
import React, { useState, useEffect, createContext, useContext, useReducer } from 'react'
import { auth } from '../Config/firebase'

const AuthContext = createContext()
const initialState = { isAuth: false, user: {} }

const reducer = (state, { type, payload }) => {
    switch (type) {
        case "SET_LOGGED_IN":
            return { isAuth: true, user: payload.user }
        case "SET_LOGGED_OUT":
            return initialState
        default:
            return state
    }
}

export default function AuthContextProvider({ children }) {

    const [isAppLoading, setIsAppLoading] = useState(true)
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch({ type: "SET_LOGGED_IN", payload: { user } })
            }
            setIsAppLoading(false)
        });
    }, [])

    return (
        <AuthContext.Provider value={{ isAppLoading, ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)