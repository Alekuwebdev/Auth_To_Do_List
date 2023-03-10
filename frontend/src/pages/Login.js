import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)
        console.log(email, password)
    }

    return ( 
        <main className="auth_main">
            <form className="login" onSubmit={handleSubmit}>
                <h2>Log In</h2>

                <label>E-Mail:</label>
                <input 
                    type="text" 
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />

                <label>Password:</label>
                <input 
                    type="password" 
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />

                <button disabled={isLoading}>Log In</button>
                {error && <div className="error">{error}</div>}
            </form>
        </main>
     );
}
 
export default Login;