import { createBrowserRouter } from "react-router-dom";
import SignIn from "./auth/signin/signin";
import SignUp from "./auth/signup/signup";
import ForgotPassord from "./auth/forgot-password/forgot-password";
import ResetPassword from "./auth/reset-password/reset-password";
import Page from ".";
import AuthGuard from "../utility/auth-guard";


const router = createBrowserRouter([
    {
        path: "/",
        Component: Page,
        children: [
            {
                path: "/",
                loader() { return AuthGuard() },
                element: "",
            },
            {
                path: "/dashboard",
                loader() { return AuthGuard() },
                element: "In Dashboard",
            },
        ],
    },

    // Un Protected Routes
    {
        path: "signin",
        loader() { return AuthGuard(false) },
        Component: SignIn
    },
    {
        path: "signup",
        loader() { return AuthGuard(false) },
        Component: SignUp
    },
    {
        path: "forgot-password",
        loader() { return AuthGuard(false) },
        Component: ForgotPassord
    },
    {
        path: "reset-password/:id",
        loader() { return AuthGuard(false) },
        Component: ResetPassword
    }

]);

export default router;