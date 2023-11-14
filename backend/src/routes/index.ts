import express from 'express';
import authRouter from './auth/auth.routes';
import membersRouter from './members/members.routes';

const router = express.Router();

router.use("/auth", authRouter);
router.use("/members", membersRouter);

export default router;