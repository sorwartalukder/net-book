import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import AddTask from "../Pages/AddTask/AddTask";
import CompletedDetails from "../Pages/CompletedTask/CompletedDetails";
import CompletedTask from "../Pages/CompletedTask/CompletedTask";
import MyTask from "../Pages/MyTask/MyTask";
import UpdateTask from "../Pages/MyTask/UpdateTask";
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
                path: '/completed-task',
                element: <PrivateRoute><CompletedTask /></PrivateRoute>
            },
            {
                path: '/completed-details/:id',
                loader: ({ params }) => fetch(`https://net-book-server.vercel.app/note/${params.id}`),
                element: <PrivateRoute><CompletedDetails /></PrivateRoute>
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
    {
        path: '/update-task/:id',
        loader: ({ params }) => fetch(`https://net-book-server.vercel.app/note/${params.id}`),
        element: <PrivateRoute><UpdateTask /></PrivateRoute>
    },

])

export default router;