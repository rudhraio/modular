import express from "express";
import { body, param, query } from "express-validator";
import validator from "../../common/helpers/middelware/validator";
import logger from "../../common/helpers/logger";
import { invalidResponse, serverErrorResponse } from "../../common/helpers/response/error";
import { Repo } from "../../common/database/repository";
import { OTP, OTPType, UtilityType } from "../../common/database/models/otp.model";
import { Users } from "../../common/database/models/users.model";
import { successResponse } from "../../common/helpers/response/success";
import { generateString } from "../../common/helpers/utility";
import { sendMail } from "../../common/events/async/send-mail";

const verifyAccount = express.Router();

const validate = [
    param("id").isUUID().withMessage("Invalid id sent"),
    query("code").notEmpty().withMessage("code is required")
]

verifyAccount.get("/:id", validator(validate), async (req, res) => {
    try {
        const { code } = req.query;
        const { id } = req.params;
        const otpRepo = new Repo(OTP);
        const userRepo = new Repo(Users);

        // check if record exists
        const checkOTP = await otpRepo.getOne({ where: { id: id, otp: code, verified: false } })
        if (!checkOTP) {
            return invalidResponse(res, "Invalid code sent");
        }

        // validate based on time [TODO]

        // change user verify status
        if (checkOTP.user.verified) {
            checkOTP.verified = true;
            await checkOTP.save();
            return invalidResponse(res, "User account already activated");
        }
        const user = await userRepo.getOne({ where: { id: checkOTP.user.id } });
        user.verified = true;
        await user.save();

        // make otp invalid
        checkOTP.verified = true;
        await checkOTP.save();

        // return success message
        return successResponse(res, "Account verified successfully");
    } catch (err) {
        logger(`[from]: verifyAccount \n[ERR]: ${JSON.stringify(err)}`);
        return serverErrorResponse(res);
    }
});

const getLinkValidate = [
    body("email").notEmpty().withMessage("Email is required")
]

verifyAccount.post("/get-link", validator(getLinkValidate), async (req, res) => {
    try {
        const { email } = req.body;
        const userRepo = new Repo(Users);
        const otpRepo = new Repo(OTP);

        // check if a user exists with that email and not verified
        const user = await userRepo.getOne({ where: { email: email, active: true } });
        if (!user) {
            return invalidResponse(res, "Invalid email sent");
        } else if (user.verified) {
            return invalidResponse(res, "Account already verified");
        }

        // check if record exists
        const checkOTP = await otpRepo.getOne({
            where: {
                to: email,
                verified: false,
                user: { id: user.id },
                type: OTPType.MAIL,
                utility: UtilityType.VERIFY
            }
        });

        // create a otp record
        let otp;
        if (!checkOTP) {
            otp = await otpRepo.create({
                otp: generateString(6),
                user: user,
                to: email,
                utility: UtilityType.VERIFY
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

        return successResponse(res, "Verification link sent successfully");
    } catch (err) {
        logger(`[from]: verifyAccount \n[ERR]: ${JSON.stringify(err)}`);
        return serverErrorResponse(res);
    }
})


export default verifyAccount;

