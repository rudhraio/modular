import { Response } from 'express';
import logger from '../logger';


function successResponse(
    res: Response,
    message: string = "ok",
    data: any = [],
    redirect?: string,
    from: string = "NA"
) {
    logger(`[response]: 200 \n[message]: ${message} \n[data]: ${JSON.stringify(data)} \n[function]: ${from} \n`, false);
    let responsePayload: any = {
        status: 200,
        message: message,
        data: data
    }
    if (redirect) {
        responsePayload["redirect"] = redirect;
    }
    return res.status(200).json(responsePayload);
}

function createResponse(
    res: Response,
    message: string = "created successfully",
    data: any = [],
    redirect?: string,
    from: string = "NA"
) {
    logger(`[response]: 201 \n[message]: ${message} \n[data]: ${JSON.stringify(data)} \n[function]: ${from} \n`, false);
    let responsePayload: any = {
        status: 201,
        message: message,
        data: data
    }
    if (redirect) {
        responsePayload["redirect"] = redirect;
    }
    return res.status(201).json(responsePayload)
}

export { successResponse, createResponse };
