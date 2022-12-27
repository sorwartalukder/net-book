import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import AddTask from "../Pages/AddTask/AddTask";
import NotFound from "../Pages/Shared/NotFound/NotFound";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <NotFound />,
        children: [
            {
                path: '/',
                element: <AddTask />
            },
        ]
    },


])

export default router;