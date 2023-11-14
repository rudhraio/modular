import express from 'express';
import { successResponse } from '../../common/helpers/response/success';
import { body } from 'express-validator';
import validator from '../../common/helpers/middelware/validator';
import { UserBusiness } from '../../common/database/models/user-business.model';
import { Repo } from '../../common/database/repository';
import { Users } from '../../common/database/models/users.model';
import authentication from '../../common/helpers/middelware/authentication';
import logger from '../../common/helpers/logger';
import { invalidResponse, serverErrorResponse } from '../../common/helpers/response/error';
import { Businesses } from '../../common/database/models/business.model';

const invite = express.Router();

const validData = [
    body('email').notEmpty().withMessage('Email field cannot be empty.').isEmail().withMessage('Invalid email format'),
    body('user_type').notEmpty().withMessage('User Type field cannot be empty.')
];


invite.post("/", validator(validData), authentication, async (req: any, res) => {
    try {
        const business_id = req.user.business;
        const auth_user = req.user.id;
        const { email, user_type } = req.body;

        const userRespo = new Repo(Users);
        const userBusinessRepo = new Repo(UserBusiness);
        const businessRespo = new Repo(Businesses);


        // check if user id already exists or not
        let user = await userRespo.getOne({ where: { email: email } });

        // if not exists create a user
        if (!user) {
            user = await userRespo.create({
                first_name: email.split("@")[0],
                email,
                username: email,
                created_by: "SELF",
                updated_by: "SELF"
            });
        }

        // add user id to business user grp
        const business = await businessRespo.getOne({ where: { id: business_id } });
        const checkUserBusiness = await userBusinessRepo.getOne({ where: { user: { id: user.id }, business: { id: business.id } } });
        if (checkUserBusiness) {
            return invalidResponse(res, "User already exists");
        }

        await userBusinessRepo.create({
            user: user,
            business: business,
            user_type: user_type,
            created_by: auth_user,
            updated_by: auth_user
        });

        // send user an email invitation to join 



        return successResponse(res);
    } catch (err) {
        logger(`[FROM]: invite \n[ERR]: ${err}`);
        return serverErrorResponse(res);
    }
})

export default invite;
