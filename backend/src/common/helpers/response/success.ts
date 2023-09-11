import { Response } from 'express';
import logger from '../logger';


function successResponse(
    res: Response,
    message: string = "ok",
    data: any = [],
    from: string = "NA"
) {
    logger(`[response]: 200 \n[message]: ${message} \n[data]: ${JSON.stringify(data)} \n[function]: ${from} \n`, false);
    return res.status(200).json({
        status: 200,
        message: message,
        data: data
    });
}

function createResponse(
    res: Response,
    message: string = "created successfully",
    data: any = [],
    from: string = "NA"
) {
    logger(`[response]: 201 \n[message]: ${message} \n[data]: ${JSON.stringify(data)} \n[function]: ${from} \n`, false);
    return res.status(201).json({
        status: 201,
        message: message,
        data: data
    })
}

export { successResponse, createResponse };
