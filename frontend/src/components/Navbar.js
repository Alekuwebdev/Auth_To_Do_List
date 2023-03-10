import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }

    return ( 
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Logo To Do</h1>
                </Link>
            </div>
            <nav>
                {user && (
                    <div className='logout'>
                        <p><Link to="/">{user.email}</Link></p>
                        <button onClick={handleClick}>Log out</button>
                    </div>
                )}
                {!user && (
                    <div>
                        <Link to="/login">LogIn</Link>
                        <Link to="/signup">SignUp</Link>
                    </div>
                )}
            </nav>
        </header>
     );
}
 
export default Navbar;