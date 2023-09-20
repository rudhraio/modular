import http from "@/lib/http";
import { URLS } from "../urls";

async function signInAPI(payload: object) {
    const response = await http.post(URLS.signin, payload);
    return response;
}

export default signInAPI;