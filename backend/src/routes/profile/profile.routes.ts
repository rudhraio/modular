import express from "express";
import listBusinesses from "./listBusinesses";
import infoProfile from "./infoProfile";
import changePassword from "./changePassword";

const profileRouter = express.Router();

profileRouter.use("/business", listBusinesses);
profileRouter.use("/info", infoProfile);
profileRouter.use("/change-password", changePassword);

export default profileRouter;