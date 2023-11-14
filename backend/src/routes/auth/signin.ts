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
import { InvitationStatusTypes, UserBusiness } from "../../common/database/models/user-business.model";


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

        const userBusiness = await userBusinessRespo.getAll({
            where: {
                user: { id: user.id },
                status: InvitationStatusTypes.ACCEPTED
            },
            relations: ["user", "business"],
            loadRelationIds: true
        });

        // generate token
        const token_payload = {
            id: user?.id
        }
        const token = generateToken(token_payload, remember ? "30d" : "1d");
        const refreshToken = generateRefreshToken({ id: user?.id });

        // Set the token in a cookie
        res.cookie('access', token, { httpOnly: true, maxAge: 86400000 });

        let response_payload: any = {
            ...user,
            access: token,
            refreshToken: refreshToken
        }

        if (userBusiness.length === 1) {
            const role_token_payload = {
                business: userBusiness[0].business,
                user_type: userBusiness[0].user_type
            }
            const role_token = generateToken(role_token_payload, remember ? "30d" : "1d");
            res.cookie('role', role_token, { httpOnly: true, maxAge: 86400000 });
            response_payload.role = role_token;
        }



        // send response
        return successResponse(res, "Login successfull", response_payload);
    } catch (err) {
        logger(`[FROM]: signin \n[ERR]: ${err}`);
        return serverErrorResponse(res);
    }

})

export default signIn;