import {
    createBrowserRouter,
} from "react-router-dom";
import Dashboard from "../components/layout/Dashboard";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Write from "../pages/Write";
import SinglePost from "../pages/SinglePost";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/post/:id",
                element: <SinglePost />
            },
            {
                path: "/write",
                element: <Write />
            },
        ]
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/login",
        element: <Login />,
    }
]);

export default router; 