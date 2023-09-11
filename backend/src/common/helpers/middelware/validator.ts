import { NextFunction } from "express";
import { validationResult } from "express-validator";
import { invalidResponse } from "../response/error";


const validator = (validations: any) => {
    return async (req: any, res: any, next: NextFunction) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (result.errors.length) break;
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return invalidResponse(res, "Some fields are missing", errors.array(), "validator")

        }
        return next();
    };
};

export default validator;