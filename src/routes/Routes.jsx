import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import ClassesHome from "../pages/Classes/ClassesHome";
import InstructorsHome from "../pages/Instructors/InstructorsHome";

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
            }
        ]
    }
])

export default Routes;