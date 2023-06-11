import { NavLink, Outlet } from "react-router-dom";
import useRole from "../../../hooks/useRole";
import logo from "./../../../assets/images/00a44425450365.563458fea527b.png";
import { FcHome } from 'react-icons/fc';
import { AuthContext } from "../../../providers/AuthProvider";
import { useContext } from "react";

const HomeDashBoard = () => {
    const { user } = useContext(AuthContext);
    const [role, isLoading] = useRole();
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center m-8">
                {/* Page content here */}
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                <Outlet></Outlet>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                {!isLoading && <ul className="menu p-4 w-80 h-full bg-base-300 text-base-content">
                    <img className="px-8 pt-4" src={logo} alt="" />
                    <h1 className="text-3xl font-bold text-blue-800 text-center">Sports Camp</h1>
                    <div className="avatar items-center gap-3 mt-5 bg-slate-300 px-6 py-4 border-2 border-blue-800 rounded-lg mx-auto">
                        <div className="w-10 rounded">
                            <img src={user?.photoURL} alt="Tailwind-CSS-Avatar-component" />
                        </div>
                        <span>
                            <h1>{user?.displayName}</h1>
                            <h1>{user?.email}</h1>
                        </span>
                    </div>
                    <div className="divider">Camp</div>

                    <li className="mb-4"><NavLink to="/"><FcHome className="text-2xl"></FcHome> Home</NavLink></li>
                    {role?.role === "admin" && <>
                        <li><NavLink to="/dashboard/allUsers">Manage Users</NavLink></li>
                        <li><NavLink to="/dashboard/manageClasses">Manage Classes</NavLink></li>
                    </>}
                    {role?.role === "instructor" && <>
                        <li><NavLink to="/dashboard/addClass">Add A Class</NavLink></li>
                        <li><NavLink to="/dashboard/myClasses">My Classes</NavLink></li>
                        <li><NavLink to="/dashboard/feedback">Feedback</NavLink></li>
                    </>}
                    {role?.role === "student" && <>
                        <li><NavLink to="/dashboard/selectedClasses">My Selected Classes</NavLink></li>
                        <li><NavLink to="/dashboard/enrolledClasses">My Enrolled Classes</NavLink></li>
                        <li><NavLink to="/dashboard/paymentClasses">Payment Classes</NavLink></li>
                        <li><NavLink to="/dashboard/paymentHistory">Payment History</NavLink></li>
                    </>}
                </ul>}

            </div>
        </div>
    );
};

export default HomeDashBoard;