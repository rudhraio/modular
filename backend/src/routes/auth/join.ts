import express from "express";
import authentication from "../../common/helpers/middelware/authentication";
import { body } from "express-validator";
import { Repo } from "../../common/database/repository";
import { Users } from "../../common/database/models/users.model";
import { invalidResponse } from "../../common/helpers/response/error";
import { createResponse } from "../../common/helpers/response/success";
import { generateRefreshToken, generateToken } from "../../common/helpers/token";
import validator from "../../common/helpers/middelware/validator";

const join = express.Router();

const validData = [
    body('first_name').notEmpty().withMessage('First Name field cannot be empty.'),
    body('last_name').notEmpty().withMessage('Last Name field cannot be empty.'),
    body('email').notEmpty().withMessage('Email field cannot be empty.').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password field cannot be empty.'),
    body('agree_to_terms').notEmpty().withMessage('Agree to Terms field cannot be empty.').isBoolean().withMessage('Agree to Terms  is a boolean field')
];

join.post("/", validator(validData), authentication, async (req: any, res: any) => {
    try {
        const { first_name, last_name, email, password, agree_to_terms } = req.body;

        if (!agree_to_terms) {
            return invalidResponse(res, "You must agree to term and conditions");
        }

        const userRespo = new Repo(Users);

        // check if email exists
        const checkUser = await userRespo.getOne({ where: { email: email, password: "NA" } }) || undefined;
        if (!checkUser) {
            return invalidResponse(res, "User with email not exists");
        }

        checkUser.first_name = first_name;
        checkUser.last_name = last_name;
        checkUser.password = password;
        checkUser.save();

        const token = generateToken({
            id: checkUser?.id
        });
        const refreshToken = generateRefreshToken({ id: checkUser?.id });

        res.cookie('access', token, { httpOnly: true, maxAge: 86400000, sameSite: 'none' });
        const userPayload = {
            first_name,
            last_name,
            email,
            image: checkUser.image,
            verified: checkUser.verified,
            access: token,
            refresh: refreshToken
        }

        return createResponse(res, "Join successfully", userPayload, "/accept");
    } catch (err) {

    }
});

export default join;