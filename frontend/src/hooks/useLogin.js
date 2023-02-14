import { useState } from "react";
import { useAuthContext } from "./useAuthContext";


export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(true)

        //const response = await fetch(process.env.REACT_APP_LOG_IN, {
        //const response = await fetch('http://localhost:4000/api/user/login', {
        const response = await fetch('https://auth-to-do-list-backend.onrender.com/api/user/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            
            body: JSON.stringify({ email, password})
        })
        const json = await response.json()

        if(!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok) {
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            // update the auth constext
            dispatch({type: 'LOGIN', payload: json})

            // update loading state
            setIsLoading(false)
        }
    }

    return { login, isLoading, error }
}