import { Link, Outlet } from "react-router-dom";
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
                    { role?.role === "admin" && <li><Link to="/dashboard/allUsers">All Users</Link></li>}
                    { role?.role === "instructor" && <li><a>Sidebar Item 2</a></li>}
                    <li><Link to="/">Home</Link></li>
                    { role?.role === "student" && <li><Link to="/dashboard/studentDashboard">Student Dashboard</Link></li>}
                </ul>}

            </div>
        </div>
    );
};

export default HomeDashBoard;