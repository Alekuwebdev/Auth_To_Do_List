import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const signup = async (email, password) => {
        setIsLoading(true)
        setError(true)

        //const response = await fetch(process.env.REACT_APP_SIGN_UP, {
        //const response = await fetch('https://auth-to-do-list-backend.onrender.com/api/user/signup', {
            const response = await fetch('https://calm-veil-worm.cyclic.app/api/user/signup', {
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

    return { signup, isLoading, error }
}