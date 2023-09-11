import { createBrowserRouter } from "react-router-dom";
import SignIn from "./auth/signin/signin";
import SignUp from "./auth/signup/signup";
import ForgotPassord from "./auth/forgot-password/forgot-password";
import ResetPassword from "./auth/reset-password/reset-password";

const router = createBrowserRouter([
    {
        path: "/",
        element: "",
    },
    {
        path: "/signin",
        Component: SignIn
    },
    {
        path: "/signup",
        Component: SignUp
    },
    {
        path: "/forgot-password",
        Component: ForgotPassord
    },
    {
        path: "/reset-password",
        Component: ResetPassword
    }
]);

export default router;