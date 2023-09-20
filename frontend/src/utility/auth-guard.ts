import { redirect } from "react-router-dom";

function AuthGuard(enabled: boolean = true) {
    const access = localStorage.getItem("access");
    return enabled ? !access ? redirect("/signin") : "" : access ? redirect("/dashboard") : ""
}

export default AuthGuard;