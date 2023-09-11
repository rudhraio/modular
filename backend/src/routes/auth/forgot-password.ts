import express from "express";
import { body } from "express-validator";
import validator from "../../common/helpers/middelware/validator";
import logger from "../../common/helpers/logger";
import { successResponse } from "../../common/helpers/response/success";
import { Repo } from "../../common/database/repository";
import { Users } from "../../common/database/models/users.model";
import { invalidResponse } from "../../common/helpers/response/error";
import { OTP, OTPType, UtilityType } from "../../common/database/models/otp.model";
import { generateString } from "../../common/helpers/utility";
import { sendMail } from "../../common/events/async/send-mail";

const forgotPassword = express.Router();

const validate = [
    body("email").isEmail().withMessage("Enter a proper email")
]

forgotPassword.post("/", validator(validate), async (req, res) => {
    try {

        const { email } = req.body;
        const userRepo = new Repo(Users);
        const otpRepo = new Repo(OTP);

        // check if a user exists with that email or
        const user = await userRepo.getOne({ where: { email: email, active: true } });
        if (!user) {
            return invalidResponse(res, "Invalid email sent");
        }

        // check if record exists
        const checkOTP = await otpRepo.getOne({
            where: {
                to: email,
                verified: false,
                user: { id: user.id },
                type: OTPType.MAIL,
                utility: UtilityType.RESET
            }
        });

        // create a otp record
        let otp;
        if (!checkOTP) {
            otp = await otpRepo.create({
                otp: generateString(6),
                user: user,
                to: email
            });
        } else if (checkOTP) {
            if (checkOTP.count > 5) {
                return invalidResponse(res, "You have reached max otp limit per day");
            }
            otp = await otpRepo.update(
                { count: checkOTP.count + 1 },
                { id: checkOTP.id });
        }

        // send email to user
        const mailPayload = checkOTP || otp;
        sendMail("otp", mailPayload);

        // send succcess message
        return successResponse(res, "OTP sent to mail successfully");
    } catch (err) {
        logger(`[from]: forgotPassword \n [ERR]: ${JSON.stringify(err)}`);
    }
})

export default forgotPassword;