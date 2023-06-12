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
import MyClasses from "../pages/Dashboard/InstructorDashboard/MyClasses";
import Feedback from "../pages/Dashboard/InstructorDashboard/Feedback";
import AdminRoute from "./AdminRoute";

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
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path: '/dashboard/selectedClasses',
                element: <StudentRoute><SelectedClasses></SelectedClasses></StudentRoute>
            },
            {
                path: '/dashboard/enrolledClasses',
                element: <StudentRoute><EnrolledClasses></EnrolledClasses></StudentRoute>
            },
            {
                path: '/dashboard/addClass',
                element: <InstructorsRoute><AddClass></AddClass></InstructorsRoute> 
            },
            {
                path: '/dashboard/manageClasses',
                element: <AdminRoute><ManageClasses></ManageClasses></AdminRoute>
            },
            {
                path: '/dashboard/paymentClasses',
                element: <StudentRoute><PaymentClasses></PaymentClasses></StudentRoute> 
            },
            {
                path: '/dashboard/paymentHistory',
                element: <StudentRoute><PaymentHistory></PaymentHistory></StudentRoute> 
            },
            {
                path: '/dashboard/myClasses',
                element: <InstructorsRoute><MyClasses></MyClasses></InstructorsRoute>
            },
            {
                path: '/dashboard/feedback',
                element: <InstructorsRoute><Feedback></Feedback></InstructorsRoute>
            }
        ]
    }
])

export default Routes;