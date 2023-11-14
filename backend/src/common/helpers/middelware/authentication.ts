
import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import config from './../../configs';

const { secretKey, refreshSecretKey } = config;


function authentication(req: any, res: Response, next: NextFunction) {
    const token = req.cookies.access;
    const role = req.cookies.role;

    if (!token || !role) {
        return res.status(401).json({ message: 'Unauthorized - Missing Token' });
    }



    jwt.verify(token, secretKey, (err: any, user: any) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden - Invalid Token' });
        }
        jwt.verify(role, secretKey, (err: any, role: any) => {
            if (err) {
                return res.status(403).json({ message: 'Forbidden - Invalid Token' });
            }
            req.user = { ...user, ...role };
        });
        next();
    });
}

export default authentication;
