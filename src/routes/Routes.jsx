import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import ClassesHome from "../pages/Classes/ClassesHome";
import InstructorsHome from "../pages/Instructors/InstructorsHome";
import Login from "../authentication/Login";
import SignUp from "../authentication/SignUp";
import PrivateRoute from "./PrivateRoute";
import StudentDashboard from "../pages/Dashboard/StudentDashboard/StudentDashboard";
import HomeDashBoard from "../pages/Dashboard/HomeDashboard/HomeDashboard";
import AllUsers from "../pages/Dashboard/AdminDashBoard/AllUsers";
import AddClass from "../pages/Dashboard/InstructorDashboard/AddClass";
import ManageClasses from "../pages/Dashboard/AdminDashBoard/ManageClasses";

const Routes = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: '/classes',
                element: <ClassesHome></ClassesHome>
            },
            {
                path: '/instructors',
                element: <PrivateRoute><InstructorsHome></InstructorsHome></PrivateRoute>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signUp',
                element: <SignUp></SignUp>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <HomeDashBoard></HomeDashBoard>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/dashboard/allUsers',
                element: <AllUsers></AllUsers>
            },
            {
                path: '/dashboard/studentDashboard',
                element: <StudentDashboard></StudentDashboard>
            },
            {
                path: '/dashboard/addClass',
                element: <AddClass></AddClass>
            },
            {
                path: '/dashboard/manageClasses',
                element: <ManageClasses></ManageClasses>
            }
        ]
    }
])

export default Routes;