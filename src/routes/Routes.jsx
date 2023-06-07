import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import ClassesHome from "../pages/Classes/ClassesHome";
import InstructorsHome from "../pages/Instructors/InstructorsHome";
import Login from "../authentication/Login";
import SignUp from "../authentication/SignUp";

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
    }
])

export default Routes;