import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import ClassesHome from "../pages/Classes/ClassesHome";
import InstructorsHome from "../pages/Instructors/InstructorsHome";
import Login from "../authentication/Login";
import SignUp from "../authentication/SignUp";
import HomeDashBoard from "../pages/Dashboard/HomeDashboard/HomeDashboard";
import AllUsers from "../pages/Dashboard/AdminDashBoard/AllUsers";
import AddClass from "../pages/Dashboard/InstructorDashboard/AddClass";
import ManageClasses from "../pages/Dashboard/AdminDashBoard/ManageClasses";
import SelectedClasses from "../pages/Dashboard/StudentDashboard/SelectedClasses";
import EnrolledClasses from "../pages/Dashboard/StudentDashboard/EnrolledClasses";
import PaymentClasses from "../pages/Dashboard/StudentDashboard/PaymentClasses";
import PaymentHistory from "../pages/Dashboard/StudentDashboard/PaymentHistory";
import InstructorsRoute from "./InstructorsRoute";
import StudentRoute from "./StudentRoute";
import PrivateRoute from "./PrivateRoute";

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
                element: <InstructorsHome></InstructorsHome>
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
        element: <PrivateRoute><HomeDashBoard></HomeDashBoard></PrivateRoute>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/dashboard/allUsers',
                element: <AllUsers></AllUsers>
            },
            {
                path: '/dashboard/selectedClasses',
                element: <SelectedClasses></SelectedClasses>
            },
            {
                path: '/dashboard/enrolledClasses',
                element: <EnrolledClasses></EnrolledClasses>
            },
            {
                path: '/dashboard/addClass',
                element: <InstructorsRoute><AddClass></AddClass></InstructorsRoute> 
            },
            {
                path: '/dashboard/manageClasses',
                element: <ManageClasses></ManageClasses>
            },
            {
                path: '/dashboard/paymentClasses',
                element: <StudentRoute><PaymentClasses></PaymentClasses></StudentRoute> 
            },
            {
                path: '/dashboard/paymentHistory',
                element: <StudentRoute><PaymentHistory></PaymentHistory></StudentRoute> 
            }
        ]
    }
])

export default Routes;