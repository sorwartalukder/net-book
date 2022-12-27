import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import AddTask from "../Pages/AddTask/AddTask";
import MyTask from "../Pages/MyTask/MyTask";
import Login from "../Pages/Shared/Login/Login";
import NotFound from "../Pages/Shared/NotFound/NotFound";
import SignUp from "../Pages/Shared/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <NotFound />,
        children: [
            {
                path: '/',
                element: <PrivateRoute><AddTask /></PrivateRoute>
            },
            {
                path: '/my-task',
                element: <PrivateRoute><MyTask /></PrivateRoute>
            },
            {
                path: '/signup',
                element: <SignUp />
            },
            {
                path: '/login',
                element: <Login />
            },
        ]
    },


])

export default router;