import http from "@/lib/http";
import { URLS } from "../urls";

async function forgotPasswordAPI(payload: object) {
    const response = await http.post(URLS.forgot_password, payload);
    return response;
}

export default forgotPasswordAPI;