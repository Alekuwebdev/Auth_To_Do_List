import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signup, error, isLoading } = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(email, password)
        // console.log(email, password)
    }

    return ( 
        <main className="auth_main">
            <form className="signup" onSubmit={handleSubmit}>
                <h2>Sign Up</h2>

                <label>E-Mail:</label>
                <input 
                    type="text" 
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />

                <label>E-Password:</label>
                <input 
                    type="password" 
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />

                <button disabled={isLoading}>Sign Up</button>
                { error && <div className="error">{error}</div>}
            </form>
        </main>
     );
}
 
export default Signup;