import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { useContext } from "react";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const handleLogOut = () => {
        logOut()
            .then(() => {
                console.log("logged out");
            })
            .catch((error) => {
                console.log(error.message);
            })
    }
    const optionItems = <>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/classes">Classes</Link></li>
        <li><Link to="/instructors">Instructors</Link></li>
        {
            user && <li><Link to="/dashboard">Dashboard</Link></li>
        }
    </>
    return (
        <div className="bg-base-300">
            <div className="navbar lg:w-5/6 mx-auto">
                <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
                <div className="navbar-end w-full">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm z-30 dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-42 right-0">
                            {optionItems}
                        </ul>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {optionItems}
                    </ul>
                </div>

                <div className="dropdown dropdown-end ml-3 lg:ml-8 mr-5">
                    {
                        user ? <>
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">

                                <div title={user.displayName} className="w-10 rounded-full">
                                    <img src={user.photoURL} />
                                </div>

                            </label>
                            <ul tabIndex={0} className="menu menu-sm z-30 dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                                <li>
                                    <a className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </a>
                                </li>
                                <li><a>Settings</a></li>
                                <li onClick={() => handleLogOut()}><a>Logout</a></li>
                            </ul>
                        </> : <Link to="/login"><button className="btn btn-primary">Login</button></Link>
                    }
                </div>

            </div>
        </div>
    );
};

export default Navbar;