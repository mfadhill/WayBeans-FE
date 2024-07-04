import { RouteObject } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home";
import DetailProduct from "../pages/detailProduct";
import Profile from "../pages/profile";
import Cart from "../pages/auth/Cart";
import BuyerLayout from "../layout/BuyerLayout";

const router: RouteObject[] = [
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
        ],
    },
    {
        path: "/",
        element: <BuyerLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "detailProduct/:id",
                element: <DetailProduct />,
            },
            {
                path: "profile",
                element: <Profile />,
            },
            {
                path: "cart",
                element: <Cart />,
            },
            // {
            //     path: "transaction/:id",
            //     element: <TransactionForm />,
            // },
        ],
    },
    {
        path: "/home",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "detailProduct/:id",
                element: <DetailProduct />,
            },
        ],
    },
];

export default router;
