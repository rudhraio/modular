import http from "@/lib/http";
import { URLS } from "../urls";

async function signUpAPI(payload: object) {
    const response = await http.post(URLS.signup, payload);
    // const data = await response.data;
    return response;
}

export default signUpAPI;