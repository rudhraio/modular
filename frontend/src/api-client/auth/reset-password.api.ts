import http from "@/lib/http";
import { URLS } from "../urls";

async function resetPasswordAPI(payload: object) {
    const response = await http.post(URLS.reset_password, payload);
    return response;
}

export default resetPasswordAPI;