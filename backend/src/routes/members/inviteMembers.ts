import express from 'express';
import { successResponse } from '../../common/helpers/response/success';
import { body, query } from 'express-validator';
import validator from '../../common/helpers/middelware/validator';
import { UserBusiness } from '../../common/database/models/user-business.model';
import { Repo } from '../../common/database/repository';
import { Users } from '../../common/database/models/users.model';
import authentication from '../../common/helpers/middelware/authentication';
import logger from '../../common/helpers/logger';
import { invalidResponse, serverErrorResponse } from '../../common/helpers/response/error';
import { Businesses } from '../../common/database/models/business.model';
import { sendInvite, sendMail } from '../../common/events/async/send-mail';

const inviteMembers = express.Router();

const validData = [
    body('email').notEmpty().withMessage('Email field cannot be empty.').isEmail().withMessage('Invalid email format'),
    body('user_type').notEmpty().withMessage('User Type field cannot be empty.')
];

const userRespo = new Repo(Users);
const userBusinessRepo = new Repo(UserBusiness);
const businessRespo = new Repo(Businesses);

inviteMembers.post("/", validator(validData), authentication, async (req: any, res) => {
    try {
        const business_id = req.user.business;
        const auth_user = req.user.id;
        const { email, user_type } = req.body;

        // check if user id already exists or not
        let is_new = false;
        let user = await userRespo.getOne({ where: { email: email } });

        console.log("Business");

        // if not exists create a user
        if (!user) {
            user = await userRespo.create({
                first_name: email.split("@")[0],
                email,
                username: email,
                created_by: "SELF",
                updated_by: "SELF"
            });
            is_new = true;
        }

        // add user id to business user grp
        const business = await businessRespo.getOne({ where: { id: business_id } });
        const checkUserBusiness = await userBusinessRepo.getOne({ where: { user: { id: user.id }, business: { id: business.id } } });
        if (checkUserBusiness) {
            return invalidResponse(res, "User already exists");
        }

        const new_user = await userBusinessRepo.create({
            user: user,
            business: business,
            user_type: user_type,
            created_by: auth_user,
            updated_by: auth_user,
            info: { is_new }
        });

        // send user an email invitation to join 
        sendInvite({
            to: email,
            bid: business.id,
            name: business.name,
            is_new: is_new,
            model: new_user
        });

        return successResponse(res);
    } catch (err) {
        logger(`[FROM]: invite \n[ERR]: ${err}`);
        return serverErrorResponse(res);
    }
})


const resendValidData = [
    query("id").notEmpty().withMessage("Id is required").isUUID().withMessage("Doesn't look like a valid id")
]

inviteMembers.get("/resend", validator(resendValidData), authentication, async (req: any, res) => {
    try {
        const { id } = req.query;
        const checkUserBusiness = await userBusinessRepo.getOne({ where: { id, status: "pending" }, relations: ["user", "business"] });

        console.log("checkUserBusiness", checkUserBusiness);

        if (!checkUserBusiness) {
            return invalidResponse(res, "No user exists");
        }

        sendInvite({
            to: checkUserBusiness.user.email,
            bid: checkUserBusiness.business.id,
            name: checkUserBusiness.business.name,
            is_new: checkUserBusiness.info.is_new,
            model: checkUserBusiness
        });


        return successResponse(res, "Email resend successfull");

    } catch (err) {
        logger(`[FROM]: invite resend \n[ERR]: ${err}`);
        return serverErrorResponse(res);
    }

})


export default inviteMembers;
