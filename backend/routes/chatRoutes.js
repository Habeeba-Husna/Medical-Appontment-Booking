import express from 'express';

import { getChatMessages,sendMessage,startPrivateChat } from '../controllers/chatController.js'

const router = express.Router();

export default (io) => {
router.post("/start-private", (req, res) =>startPrivateChat(req, res, io));
router.post("/message",(req, res) =>  sendMessage(req, res, io));
router.get("/:chatId/messages",(req, res) =>  getChatMessages(req, res, io));
return router;
}

// export default router;
