import express from 'express';
import validator from '../../common/helpers/middelware/validator';
import { body } from 'express-validator';
import { successResponse } from '../../common/helpers/response/success';
import { invalidResponse, serverErrorResponse } from '../../common/helpers/response/error';
import logger from '../../common/helpers/logger';
import { Repo } from '../../common/database/repository';
import { Businesses } from '../../common/database/models/business.model';
import { Users } from '../../common/database/models/users.model';
import { UserBusiness, UserTypes } from '../../common/database/models/user-business.model';
import initialProcess from '../../common/events/async/initial-process';
import { generateToken } from '../../common/helpers/token';

const signUp = express.Router();

const validData = [
    body('first_name').notEmpty().withMessage('First Name field cannot be empty.'),
    body('last_name').notEmpty().withMessage('Last Name field cannot be empty.'),
    body('email').notEmpty().withMessage('Email field cannot be empty.').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password field cannot be empty.'),
    body('domain').notEmpty().withMessage('Domain field cannot be empty.'),
    body('agree_to_terms').notEmpty().withMessage('Agree to Terms field cannot be empty.').isBoolean().withMessage('Agree to Terms  is a boolean field'),
];

signUp.post("/", validator(validData), async (req, res) => {
    try {

        const { first_name, last_name, email, password, domain, agree_to_terms } = req.body;

        if (!agree_to_terms) {
            return invalidResponse(res, "You must agree to term and conditions");
        }

        const businessRespo = new Repo(Businesses);
        const userRespo = new Repo(Users);
        const userBusinessRepo = new Repo(UserBusiness);

        // check if domain exists
        const checkBusiness = await businessRespo.getAll({ where: { domain: domain } }) || [];
        if (checkBusiness?.length !== 0) {
            return invalidResponse(res, "Domain name already exists");
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
            username: email
        });

        // create business
        const business = await businessRespo.create({
            domain,
            created_by: user.id,
            updated_by: user.id
        });

        // link business and user with user_type
        await userBusinessRepo.create({
            user: user,
            business: business,
            user_type: UserTypes.OWNER,
            created_by: user.id,
            updated_by: user.id
        })

        // Running backgroun actions once user registerd
        initialProcess(user, business);

        const token = generateToken({ id: user?.id, domain: business.id, user_type: UserTypes.OWNER });

        // Set the token in a cookie
        res.cookie('access', token, { httpOnly: true, maxAge: 86400000 });

        const userPayload = {
            first_name,
            last_name,
            email,
            ccode: user.ccode,
            phone_number: user.phone_number,
            image: user.image,
            domain: business.id,
            user_type: UserTypes.OWNER,
            verified: user.verified,
        }

        return successResponse(res, "SignUp successfully", userPayload);
    } catch (err) {
        logger(`[FROM]: signup \n[ERR]: ${err}`);
        return serverErrorResponse(res);
    }
})

export default signUp;
