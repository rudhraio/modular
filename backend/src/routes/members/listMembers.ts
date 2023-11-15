import express from 'express';

import authentication from "../../common/helpers/middelware/authentication";
import { successResponse } from "../../common/helpers/response/success";
import logger from '../../common/helpers/logger';
import { serverErrorResponse } from '../../common/helpers/response/error';
import { Repo } from '../../common/database/repository';
import { UserBusiness } from '../../common/database/models/user-business.model';

const listMembers = express.Router();


listMembers.get("/", authentication, async (req: any, res) => {
    try {
        const business_id = req.user.business;
        const userBusinessRepo = new Repo(UserBusiness);
        // const businessRespo = new Repo(Businesses);

        // const business = await businessRespo.getOne({ where: { id: business_id } });
        const checkUserBusiness = await userBusinessRepo.getAll({ where: { business: { id: business_id }, deleted: false }, relations: ["user"] });

        // let members_list = [];
        // checkUserBusiness.forEach(element => {

        // });


        return successResponse(res, "members list", checkUserBusiness);
    } catch (err) {
        logger(`[FROM]: members list \n[ERR]: ${err}`);
        return serverErrorResponse(res);
    }
});

export default listMembers;
