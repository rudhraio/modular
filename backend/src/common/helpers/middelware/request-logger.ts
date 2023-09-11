import { Request, Response, NextFunction } from "express";
import logger from "../logger";

function requestLogger(req: Request, res: Response, next: NextFunction) {

    logger(`[IP]: ${req.ip} \n[method]: ${req.method} \n[headers]: ${JSON.stringify(req.headers)} \n[data]: ${JSON.stringify(req.body)} \n[url]: ${req.url} \n`, false)
    return next();
}

export default requestLogger