import { Businesses } from "../../database/models/business.model";
import { OTP, UtilityType } from "../../database/models/otp.model";
import { Users } from "../../database/models/users.model";
import { Repo } from "../../database/repository";
import logger from "../../helpers/logger";
import { generateString } from "../../helpers/utility";
import { sendMail } from "./send-mail";

async function initialProcess(user: Users, business: Businesses) {
    logger("Background operation");
    const otpRepo = new Repo(OTP);

    // send verify link
    const otp = await otpRepo.create({
        otp: generateString(6),
        user: user,
        to: user.email,
        utility: UtilityType.VERIFY
    });
    sendMail("otp", otp);
}

export default initialProcess;