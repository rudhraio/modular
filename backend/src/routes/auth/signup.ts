import express from 'express';
import validator from '../../common/helpers/middelware/validator';
import { body } from 'express-validator';
import { createResponse, successResponse } from '../../common/helpers/response/success';
import { invalidResponse, serverErrorResponse } from '../../common/helpers/response/error';
import logger from '../../common/helpers/logger';
import { Repo } from '../../common/database/repository';
import { Businesses } from '../../common/database/models/business.model';
import { Users } from '../../common/database/models/users.model';
import { InvitationStatusTypes, UserBusiness, UserTypes } from '../../common/database/models/user-business.model';
import initialProcess from '../../common/events/async/initial-process';
import { generateRefreshToken, generateToken } from '../../common/helpers/token';

const signUp = express.Router();

const validData = [
    body('first_name').notEmpty().withMessage('First Name field cannot be empty.'),
    body('last_name').notEmpty().withMessage('Last Name field cannot be empty.'),
    body('email').notEmpty().withMessage('Email field cannot be empty.').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password field cannot be empty.'),
    body('business').notEmpty().withMessage('business field cannot be empty.'),
    body('agree_to_terms').notEmpty().withMessage('Agree to Terms field cannot be empty.').isBoolean().withMessage('Agree to Terms  is a boolean field'),
];

signUp.post("/", validator(validData), async (req, res) => {
    try {

        const { first_name, last_name, email, password, business, agree_to_terms } = req.body;
        if (!agree_to_terms) {
            return invalidResponse(res, "You must agree to term and conditions");
        }

        const businessRespo = new Repo(Businesses);
        const userRespo = new Repo(Users);
        const userBusinessRepo = new Repo(UserBusiness);

        // check if business exists
        const checkBusiness = await businessRespo.getAll({ where: { business: business } }) || [];
        if (checkBusiness?.length !== 0) {
            return invalidResponse(res, "business name already exists");
        }

        // check if email exists
        const checkUser = await userRespo.getAll({ where: { email: email } }) || [];
        if (checkUser?.length !== 0) {
            return invalidResponse(res, "User with email already exists");
        }

        // create user
        const user = await userRespo.create({
            first_name,
            last_name,
            email,
            password,
            username: email,
            created_by: "SELF",
            updated_by: "SELF"
        });

        // create business
        const businessData = await businessRespo.create({
            business,
            name: business,
            created_by: user.id,
            updated_by: user.id
        });

        // link business and user with user_type
        await userBusinessRepo.create({
            user: user,
            business: businessData,
            user_type: UserTypes.OWNER,
            status: InvitationStatusTypes.ACCEPTED,
            created_by: user.id,
            updated_by: user.id
        })

        // Running backgroun actions once user registerd
        initialProcess(user, businessData);

        const token = generateToken({
            id: user?.id,
            // business: businessData.id,
            // user_type: UserTypes.OWNER
        });
        const refreshToken = generateRefreshToken({ id: user?.id });

        const role_token = generateToken({
            business: businessData.id,
            user_type: UserTypes.OWNER
        });


        // Set the token in a cookie
        res.cookie('access', token, { httpOnly: true, maxAge: 86400000, sameSite: 'none' });
        res.cookie('role', role_token, { httpOnly: true, maxAge: 86400000, sameSite: 'none' });

        const userPayload = {
            first_name,
            last_name,
            email,
            ccode: user.ccode,
            phone_number: user.phone_number,
            image: user.image,
            verified: user.verified,
            access: token,
            refresh: refreshToken
        }

        return createResponse(res, "SignUp successfully", userPayload);
    } catch (err) {
        logger(`[FROM]: signup \n[ERR]: ${err}`);
        return serverErrorResponse(res);
    }
})

export default signUp;
