import express from 'express';
import signUp from './signup';
import signIn from './signin';
import forgotPassword from './forgot-password';
import resetPassword from './reset-password';
import verifyAccount from './verify-account';


const authRouter = express.Router();

authRouter.use("/signup", signUp);
authRouter.use("/signin", signIn);
authRouter.use("/forgot-password", forgotPassword);
authRouter.use("/reset-password", resetPassword);
authRouter.use("/verify", verifyAccount);


export default authRouter;