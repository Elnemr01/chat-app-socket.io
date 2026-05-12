import express from 'express';
import verifyToken from '../middlewares/verifyToken.js';
import { getMessages, getSidebarUsers, markMessagesAsSeen, sendMessage } from '../controllers/messageController.js';
// import { uploadChatImage } from '../utils/cloudinary.js';


const messageRouter = express.Router();

messageRouter.route("/friends")
    .get(verifyToken,getSidebarUsers);

messageRouter.route("/:id")
    .get(verifyToken,getMessages);

messageRouter.route("/mark/:id")
    .patch(verifyToken,markMessagesAsSeen);

// messageRouter.route("/send-message/:id")
//     .post(verifyToken,uploadChatImage.single("image"),sendMessage);











export default messageRouter;