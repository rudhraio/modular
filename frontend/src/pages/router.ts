import { createBrowserRouter } from "react-router-dom";
import SignIn from "./auth/signin/signin";
import SignUp from "./auth/signup/signup";
import ForgotPassord from "./auth/forgot-password/forgot-password";
import ResetPassword from "./auth/reset-password/reset-password";
import Page from ".";
import AuthGuard from "../utility/auth-guard";
import SettingsPage from "./settings/settings-page";
import GeneralPage from "./settings/general-page/general-page";
import InfoPage from "./settings/info-page/info-page";
import MembersPage from "./settings/members-page/members-page";
import ProfileInfoPage from "./settings/profile-info/profile-info";
import ChangePasswordPage from "./settings/change-password/change-password";


const router = createBrowserRouter([
    {
        path: "/",
        Component: Page,
        loader() { return AuthGuard() },
        children: [
            {
                path: "/",

                element: "",
            },
            {
                path: "/dashboard",
                element: "In Dashboard",
            },
            {
                path: "/settings",
                Component: SettingsPage,
                children: [
                    {
                        path: "general",
                        Component: GeneralPage
                    },
                    {
                        path: "info",
                        Component: InfoPage,
                    },
                    {
                        path: "members",
                        Component: MembersPage,
                    },
                    {
                        path: "profile",
                        Component: ProfileInfoPage,
                    },
                    {
                        path: "change-password",
                        Component: ChangePasswordPage,
                    }
                ]
            }
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