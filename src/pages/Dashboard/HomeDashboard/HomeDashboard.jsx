import { NavLink, Outlet } from "react-router-dom";
import useRole from "../../../hooks/useRole";

const HomeDashBoard = () => {
    const [role, isLoading] = useRole();
    console.log(role);
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
                { !isLoading && <ul className="menu p-4 w-80 h-full bg-base-300 text-base-content">
                    { role?.role === "admin" && <li><NavLink to="/dashboard/allUsers">All Users</NavLink></li>}
                    { role?.role === "instructor" && <li><NavLink to="/dashboard/addClass">Instructor Dashboard</NavLink></li>}
                    <li><NavLink to="/">Home</NavLink></li>
                    { role?.role === "student" && <li><NavLink to="/dashboard/studentDashboard">Student Dashboard</NavLink></li>}
                </ul>}

            </div>
        </div>
    );
};

export default HomeDashBoard;