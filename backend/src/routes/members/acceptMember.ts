import express from "express";
import authentication from "../../common/helpers/middelware/authentication";
import logger from "../../common/helpers/logger";
import { invalidResponse, serverErrorResponse } from "../../common/helpers/response/error";
import { successResponse } from "../../common/helpers/response/success";
import { Repo } from "../../common/database/repository";
import { UserBusiness } from "../../common/database/models/user-business.model";
import { query } from "express-validator";
import validator from "../../common/helpers/middelware/validator";

const acceptMember = express.Router();

const validData = [
    query('bid').notEmpty().withMessage('business id cannot be empty.'),
    query('status').notEmpty().withMessage('status cannot be empty.')
];

acceptMember.get("/", authentication, validator(validData), async (req: any, res: any) => {
    try {
        const userBusinessRepo = new Repo(UserBusiness);

        const { bid, status } = req.query;
        const { id } = req.user;


        const checkUserBusiness = await userBusinessRepo.getOne({ where: { user: { id: id }, business: { id: bid } } });
        if (!checkUserBusiness) {
            return invalidResponse(res, "Invalid Accept request");
        }

        if (checkUserBusiness.status === "accepted") {
            return successResponse(res, "Request already accepted");
        }

        if (checkUserBusiness.status === "rejected") {
            return invalidResponse(res, "Request has been rejected");
        }

        if (status === "accepted" || status === "rejected") {
            checkUserBusiness.status = status;
            checkUserBusiness.save();
        } else {
            return invalidResponse(res, "Invalid status code sent");

        }

        return successResponse(res, "Request has been accepted successfully");
    } catch (err) {
        logger(`[ERR]: from accept: ${err}`);
        return serverErrorResponse(res);
    }
});

export default acceptMember;