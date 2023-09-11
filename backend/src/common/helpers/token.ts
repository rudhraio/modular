import jwt from 'jsonwebtoken';
import config from '../configs';

const { secretKey, refreshSecretKey } = config;

export function generateToken(payload: any, expiresIn: string = '1d'): string {
    return jwt.sign(payload, secretKey, { expiresIn: '1d' });
}

export function generateRefreshToken(payload: any): string {
    return jwt.sign(payload, refreshSecretKey, { expiresIn: '7d' });
}

export function verifyToken(token: string): any {
    try {
        return jwt.verify(token, secretKey);
    } catch (err) {
        return null;
    }
}

export function verifyRefreshToken(refreshToken: string): any {
    try {
        return jwt.verify(refreshToken, refreshSecretKey);
    } catch (err) {
        return null;
    }
}