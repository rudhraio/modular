import express from 'express';
import inviteMembers from './inviteMembers';
import listMembers from './listMembers';
import acceptMember from './acceptMember';
import removeMember from './removeMember';



const membersRouter = express.Router();

membersRouter.use("/invite", inviteMembers);
membersRouter.use("/list", listMembers);
membersRouter.use("/remove", removeMember);
membersRouter.use("/accept", acceptMember);


export default membersRouter;