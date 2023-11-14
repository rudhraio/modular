import logger from "../../helpers/logger";
import axios from 'axios';


export function sendMail(type: string = "otp", data: any, subject: string = "Email Subject", body: string = "Email Body") {
    if (type === "otp") {
        sendOTP({ ...data, subject, body });
    }
}

function sendOTP(data: any) {

    try {
        const apiUrl: string = process.env.EMAIL_API || "";
        let body = `${process.env.HOST}/verify/${data.id}?code=${data.otp}`;
        if (data.utility === "reset") {
            body = `${process.env.HOST}/reset-password/${data.id}?code=${data.otp}`
        }
        const postData = {
            "to": [`${data.to}`],
            "subject": `${data.subject}`,
            "body": body
        };

        // Headers to include in the request
        const headers = {
            "token": `${process.env.EMAIL_TOKEN}`
        };

        // Make the fetch call
        // Make the Axios POST request
        axios.post(apiUrl, postData, { headers })
            .then(response => {
                logger('Response data:', response.data);
            })
            .catch(error => {
                logger('Axios error:', error);
            });

    } catch (error) {
        logger(`[Err]: SENDMAIL =-->\n ${error}`);
    }

    logger(`[id]: ${data.id} \n[otp]: ${data.otp}`);
    logger(`/reset-password/${data.id}?code=${data.otp}`);
}