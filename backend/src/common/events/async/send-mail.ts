import logger from "../../helpers/logger";
import axios from 'axios';


export function sendMail(type: string = "otp", data: any, subject: string = "Email Subject", body: string = "Email Body") {
    if (type === "otp") {
        sendOTP({ ...data, subject, body });
    }

    if (type === "invite") {
        sendInvite(data);
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

        sendSesMail(postData);

    } catch (error) {
        logger(`[Err]: SENDMAIL =-->\n ${error}`);
    }

    logger(`[id]: ${data.id} \n[otp]: ${data.otp}`);
    logger(`/reset-password/${data.id}?code=${data.otp}`);
}

export function sendInvite(data: any) {
    try {
        const { to, bid, name, is_new, model } = data;
        const subject = `You have been invited to join ${name}`
        const body = `${process.env.HOST}/join/${bid}/${is_new ? "" : "?new=false"}`

        const postData = {
            "to": [`${to}`],
            "subject": `${subject}`,
            "body": body
        };
        sendSesMail(postData, model);

    } catch (error) {
        logger(`[Err]: SENDMAIL =-->\n ${error}`);
    }
}

function sendSesMail(postData: any, model?: any) {

    const apiUrl: string = process.env.EMAIL_API || "";
    const headers = {
        "token": `${process.env.EMAIL_TOKEN}`
    };

    axios.post(apiUrl, postData, { headers })
        .then(async response => {
            logger('Response data:', response.data);
            console.log("Model", model);
            if (model) {
                model.info = { ...model.info, email: "SENT" };
                await model.save();

            }
        })
        .catch(async error => {
            logger('Axios error:', error);
            console.log("Model", model);

            if (model) {
                model.info = { ...model.info, email: "FAILED" };
                await model.save();
            }
        });
}