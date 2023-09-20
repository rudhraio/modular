import express from "express";
import { body } from "express-validator";
import validator from "../../common/helpers/middelware/validator";
import logger from "../../common/helpers/logger";
import { invalidResponse, serverErrorResponse } from "../../common/helpers/response/error";
import { Users } from "../../common/database/models/users.model";
import { Repo } from "../../common/database/repository";
import { successResponse } from "../../common/helpers/response/success";
import { generateRefreshToken, generateToken } from "../../common/helpers/token";
import { Businesses } from "../../common/database/models/business.model";
import { UserBusiness } from "../../common/database/models/user-business.model";


const signIn = express.Router();

const validate = [
    body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Enter a valid email"),
    body("password").notEmpty().withMessage("Password is required").isString().withMessage("Enter a valid password"),
    body("remember").optional()
]

signIn.post("/", validator(validate), async (req, res) => {
    try {
        const { email, password, remember = false } = req.body;

        const userRespo = new Repo(Users);
        const businessRespo = new Repo(Businesses);
        const userBusinessRespo = new Repo(UserBusiness);

        // check if email exists
        const user = await userRespo.getOne({ where: { email }, select: ["id", "first_name", "last_name", "email", "ccode", "phone_number", "image", "password", "salt", "verified"] });
        if (!user) {
            return invalidResponse(res, "Invalid user credentials");
        }


        // check if password is correct
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return invalidResponse(res, "Invalid user credentials");
        }

        delete user.salt;
        delete user.password;

        // get userbusiness
        const userBusiness = await userBusinessRespo.getOne({ where: { user: { id: user.id } }, select: ["user", "business"] });

        // get business data
        const business = await businessRespo.getOne({ where: { id: userBusiness.business } });

        // generate token
        const token = generateToken({ id: user?.id, domain: business.id, user_type: userBusiness.user_type }, remember ? "30d" : "1d");
        const refreshToken = generateRefreshToken({ id: user?.id });

        // Set the token in a cookie
        res.cookie('access', token, { httpOnly: true, maxAge: 86400000 });

        // send response
        return successResponse(res, "Login successfull", { ...user, domain: business.id, user_type: userBusiness.user_type, access: token, refreshToken: refreshToken });
    } catch (err) {
        logger(`[FROM]: signin \n[ERR]: ${err}`);
        return serverErrorResponse(res);
    }

})

export default signIn;