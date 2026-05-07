import express from 'express';
import verifyToken from '../middlewares/verifyToken.js';
import { getMessages, getSidebarUsers, markMessagesAsSeen } from '../controllers/messageController.js';


const messageRouter = express.Router();

messageRouter.route("/friends").get(verifyToken,getSidebarUsers);
messageRouter.route("/:id").get(verifyToken,getMessages);
messageRouter.route("/mark/:id").get(verifyToken,markMessagesAsSeen);











export default messageRouter;