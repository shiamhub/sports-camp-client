import { NavLink, Outlet } from "react-router-dom";
import useRole from "../../../hooks/useRole";

const HomeDashBoard = () => {
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
                    {role?.role === "admin" && <>
                        <li><NavLink to="/dashboard/allUsers">Manage Users</NavLink></li>
                        <li><NavLink to="/dashboard/manageClasses">Manage Classes</NavLink></li>
                    </>}
                    {role?.role === "instructor" && <li><NavLink to="/dashboard/addClass">Add A Class</NavLink></li>}
                    {role?.role === "student" && <>
                        <li><NavLink to="/dashboard/selectedClasses">My Selected Classes</NavLink></li>
                        <li><NavLink to="/dashboard/enrolledClasses">My Enrolled Classes</NavLink></li>
                        <li><NavLink to="/dashboard/paymentClasses">Payment Classes</NavLink></li>
                        <li><NavLink to="/dashboard/paymentHistory">Payment History</NavLink></li>
                    </>}
                    <li><NavLink to="/">Home</NavLink></li>
                </ul>}

            </div>
        </div>
    );
};

export default HomeDashBoard;