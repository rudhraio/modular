import express from "express";
import authentication from "../../common/helpers/middelware/authentication";
import { Repo } from "../../common/database/repository";
import { Users } from "../../common/database/models/users.model";
import logger from "../../common/helpers/logger";
import { notFoundResponse, serverErrorResponse } from "../../common/helpers/response/error";
import { successResponse } from "../../common/helpers/response/success";
import { body } from "express-validator";
import validator from "../../common/helpers/middelware/validator";

const infoProfile = express.Router();

const userRespo = new Repo(Users);

infoProfile.get("/", authentication, async (req: any, res) => {
    try {

        const user = await userRespo.getOne({
            where: {
                id: req.user.id,
                deleted: false,
                active: true
            }, select: ["id", "first_name", "last_name", "email", "ccode", "phone_number", "image", "verified"]
        });

        if (!user) {
            return notFoundResponse(res, "User information not found")
        }

        return successResponse(res, "User profile information", user);
    } catch (err) {
        logger(`[FROM]: user profile \n[ERR]: ${err}`);
        return serverErrorResponse(res);
    }
});

const validData = [
    body('first_name').notEmpty().withMessage('First Name field cannot be empty.'),
    body('last_name').notEmpty().withMessage('Last Name field cannot be empty.'),
    body('ccode').notEmpty().withMessage('ccode field cannot be empty.'),
    body('phone_number').notEmpty().withMessage('Phone number field cannot be empty.'),
    body('image').notEmpty().withMessage('Image field cannot be empty.')
]

infoProfile.put("/", authentication, validator(validData), async (req: any, res) => {
    try {
        const { first_name, last_name, ccode, phone_number, image } = req.body;

        const user = await userRespo.update({ first_name, last_name, ccode, phone_number, image }, {
            id: req.user.id,
            deleted: false,
            active: true
        });

        if (user.affected === 0) {
            return notFoundResponse(res, "User information not found");
        }

        return successResponse(res, "User information updated successfully", { first_name, last_name, ccode, phone_number, image });
    } catch (err) {
        logger(`[FROM]: user profile \n[ERR]: ${err}`);
        return serverErrorResponse(res);
    }
});

export default infoProfile;