import express from "express";
import authentication from "../../common/helpers/middelware/authentication";
import validator from "../../common/helpers/middelware/validator";
import { body } from "express-validator";
import logger from "../../common/helpers/logger";
import { invalidResponse, notFoundResponse, serverErrorResponse } from "../../common/helpers/response/error";
import { successResponse } from "../../common/helpers/response/success";
import { Repo } from "../../common/database/repository";
import { Users } from "../../common/database/models/users.model";

const changePassword = express.Router();

const validData = [
    body("old_password").notEmpty().withMessage("Old Password can't be empty"),
    body("new_password").notEmpty().withMessage("New Password can't be empty")
]

const userRespo = new Repo(Users);

changePassword.post("/", authentication, validator(validData), async (req: any, res) => {
    try {

        const { old_password, new_password } = req.body;
        const uid = req.user.id;

        const user = await userRespo.getOne({ where: { id: uid, active: true, deleted: false } });

        if (!user) {
            return notFoundResponse(res, "No User found", {}, "/login");
        }

        const isPasswordValid = await user.comparePassword(old_password);
        if (!isPasswordValid) {
            return invalidResponse(res, "Invalid user credentials");
        }

        user.password = new_password;
        await user.save();

        return successResponse(res, "Password updated successfully");
    } catch (err) {
        logger(`[FROM]: change password \n[ERR]: ${err}`);
        return serverErrorResponse(res);
    }
});

export default changePassword;