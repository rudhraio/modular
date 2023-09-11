import { Response } from 'express';
import logger from '../logger';


function invalidResponse(
    res: Response,
    message: string = "Invalid data send",
    data: any = [],
    from: string = "NA"
) {
    logger(`[response]: 400 \n[message]: ${message} \n[data]: ${JSON.stringify(data)} \n[function]: ${from} \n`, false);

    return res.status(400).json({
        status: 400,
        message: message,
        data: data
    })
}


function notFoundResponse(
    res: Response,
    message: string = "No data found",
    data: any = [],
    from: string = "NA"
) {
    logger(`[response]: 404 \n[message]: ${message} \n[data]: ${JSON.stringify(data)} \n[function]: ${from} \n`, false);

    return res.status(404).json({
        status: 404,
        message: message,
        data: data
    })
}

function unauthorizedResponse(
    res: Response,
    message: string = "user unauthorized",
    data: any = [],
    from: string = "NA"
) {
    logger(`[response]: 403 \n[message]: ${message} \n[data]: ${JSON.stringify(data)} \n[function]: ${from} \n`, false);

    return res.status(403).json({
        status: 403,
        message: message,
        data: data
    })
}

function serverErrorResponse(
    res: Response,
    message: string = "Internal server error",
    data: any = [],
    from: string = "NA"
) {
    logger(`[response]: 500 \n[message]: ${message} \n[data]: ${JSON.stringify(data)} \n[function]: ${from} \n`, false);

    return res.status(500).json({
        status: 500,
        message: message,
        data: data
    })
}

export { invalidResponse, notFoundResponse, unauthorizedResponse, serverErrorResponse }