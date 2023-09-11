import express from "express";
import { body } from "express-validator";
import validator from "../../common/helpers/middelware/validator";
import logger from "../../common/helpers/logger";
import { invalidResponse, serverErrorResponse } from "../../common/helpers/response/error";
import { Repo } from "../../common/database/repository";
import { OTP } from "../../common/database/models/otp.model";
import { successResponse } from "../../common/helpers/response/success";
import { Users } from "../../common/database/models/users.model";
const resetPassword = express.Router();

const validate = [
    body("id").isUUID().withMessage("Id is invalid"),
    body("otp").notEmpty().withMessage("OTP is required"),
    body("password").notEmpty().withMessage("Password is requied")
]

resetPassword.post("/", validator(validate), async (req, res) => {
    try {

        const { id, otp, password } = req.body;
        const otpRepo = new Repo(OTP);
        const userRepo = new Repo(Users);

        // check for otp record
        const checkOTP = await otpRepo.getOne({ where: { id: id, verified: false, otp: otp } });
        if (!checkOTP) {
            return invalidResponse(res, "Invalid otp sent");
        }

        // check time limit [TODO]

        // update user password
        if (!checkOTP.user.active) {
            return invalidResponse(res, "User account deactivated");
        }
        const user = await userRepo.getOne({ where: { id: checkOTP.user.id } });
        user.password = password;
        const data = await user.save();

        // make otp invalid
        checkOTP.verified = true;
        checkOTP.save();

        // return response
        return successResponse(res, "Password reset successfull");

    } catch (err) {
        logger(`[from]: resetPassword \n [err]: ${JSON.stringify(err)}`);
        return serverErrorResponse(res);
    }
})

export default resetPassword;