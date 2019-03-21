const express = require(`express`);
const router = express.Router();
const chatController = require(`../api/controller/chats`);

router.post(`/`, chatController.create);
router.get(`/`, chatController.findChatInstance);
router.put(`/comment`, chatController.addComment);

module.exports = router;
