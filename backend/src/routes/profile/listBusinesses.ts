import express from "express";
import authentication from "../../common/helpers/middelware/authentication";
import logger from "../../common/helpers/logger";
import { invalidResponse, serverErrorResponse } from "../../common/helpers/response/error";
import { successResponse } from "../../common/helpers/response/success";
import { Repo } from "../../common/database/repository";
import { UserBusiness } from "../../common/database/models/user-business.model";
import { param } from "express-validator";
import validator from "../../common/helpers/middelware/validator";
import { generateToken } from "../../common/helpers/token";

const listBusinesses = express.Router();
const userBusinessRepo = new Repo(UserBusiness);

listBusinesses.get("/", authentication, async (req: any, res) => {
    try {
        const business_list = await userBusinessRepo.getAll({
            where: {
                user: {
                    id: req.user.id
                },
                deleted: false,
                status: "accepted"
            }, relations: ["business"]
        })
        return successResponse(res, "business list", business_list);
    } catch (err) {
        logger(`[FROM]: business list \n[ERR]: ${err}`);
        return serverErrorResponse(res);
    }
});

const validData = [
    param("id").isUUID().withMessage("Invalid business sent")
]

listBusinesses.get("/:id", authentication, validator(validData), async (req: any, res) => {
    try {
        const { id } = req.params;
        const business_info = await userBusinessRepo.getOne({
            where: {
                user: {
                    id: req.user.id
                },
                business: {
                    id: id
                },
                deleted: false,
                status: "accepted"
            }
        });

        if (!business_info) {
            return invalidResponse(res, "No business found");
        }

        const role_token_payload = {
            business: id,
            user_type: business_info.user_type
        }
        const role_token = generateToken(role_token_payload);
        res.cookie('role', role_token, { httpOnly: true, maxAge: 86400000 });

        return successResponse(res, "business list", { role: role_token });
    } catch (err) {
        logger(`[FROM]: business list \n[ERR]: ${err}`);
        return serverErrorResponse(res);
    }
});

export default listBusinesses;