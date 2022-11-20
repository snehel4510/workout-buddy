import { Link } from "react-router-dom";
import { GiBiceps } from "react-icons/gi";
import { useLogut } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {

    const { logout } = useLogut()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout();
    }

    return ( 
        <header>
            <div className="container">
                <Link to="/">
                    <h1>WorkOut Buddy <GiBiceps /></h1>
                </Link>
                <nav>
                    {user && (
                        <div>
                            <span>{user.email}</span>
                            <button onClick={handleClick}>Logout</button>
                        </div>
                    )}
                    {!user && (
                        <div>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Signup</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
     );
}
 
export default Navbar;