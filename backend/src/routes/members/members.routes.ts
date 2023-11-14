import express from 'express';
import invite from './invite';
import membersList from './list';
import accept from './accept';



const membersRouter = express.Router();

membersRouter.use("/invite", invite);
membersRouter.use("/list", membersList);
membersRouter.use("/accept", accept);


export default membersRouter;