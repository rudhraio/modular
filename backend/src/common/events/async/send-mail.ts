import logger from "../../helpers/logger";

export function sendMail(type: string = "otp", data: any) {
    if (type === "otp") {
        sendOTP(data);
    }
}

function sendOTP(data: any) {
    logger(`[id]: ${data.id} \n[otp]: ${data.otp}`);
    logger(`/reset-password/${data.id}?code=${data.otp}`);
}