import { Link } from "react-router-dom";
import { GiBiceps } from "react-icons/gi";

const Navbar = () => {
    return ( 
        <header>
            <div className="container">
                <Link to="/">
                    <h1>WorkOut Buddy <GiBiceps /></h1>
                </Link>
            </div>
        </header>
     );
}
 
export default Navbar;