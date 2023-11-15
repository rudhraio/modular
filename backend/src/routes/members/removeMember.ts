import express from "express";
import { query } from "express-validator";
import authentication from "../../common/helpers/middelware/authentication";
import validator from "../../common/helpers/middelware/validator";
import logger from "../../common/helpers/logger";
import { invalidResponse, serverErrorResponse } from "../../common/helpers/response/error";
import { Repo } from "../../common/database/repository";
import { UserBusiness } from "../../common/database/models/user-business.model";
import { successResponse } from "../../common/helpers/response/success";
import { Not } from "typeorm";

const removeMember = express.Router();

const validData = [
    query('ubid').notEmpty().withMessage('user business id cannot be empty.')
];
const userBusinessRepo = new Repo(UserBusiness);

removeMember.delete("/", authentication, validator(validData), async (req: any, res) => {
    try {
        // ubid => user business id
        const { ubid } = req.query;
        const business_id = req.user.business;

        const checkUserBusiness = await userBusinessRepo.getOne({
            where: {
                id: ubid,
                business: { id: business_id },
                deleted: false,
                user_type: Not("owner")
            }
        });

        if (!checkUserBusiness) {
            return invalidResponse(res, "User doesn't exists");
        }

        await userBusinessRepo.delete({}, {
            id: ubid,
            business: { id: business_id }
        });

        return successResponse(res, "User successfully removed")

    } catch (err) {
        logger(`[FROM]: invite \n[ERR]: ${err}`);
        return serverErrorResponse(res);
    }
})

export default removeMember;