import express from 'express';
import authRouter from './auth/auth.routes';
import membersRouter from './members/members.routes';
import profileRouter from './profile/profile.routes';

const router = express.Router();

router.use("/auth", authRouter);
router.use("/members", membersRouter);
router.use("/profile", profileRouter);

export default router;