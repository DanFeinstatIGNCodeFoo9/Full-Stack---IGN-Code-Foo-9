const express = require(`express`);
const router = express.Router();
const chatController = require(`../api/controller/chats`);
// const app = express();
const jwt = require(`jsonwebtoken`);

function validateUser(req, res, next) {
  jwt.verify(
    req.headers[`x-access-token`],
    req.app.get(process.env.SECRET),
    function(err, decode) {
      if (err) {
        res.json({ status: "error", message: err.message, data: null });
      } else {
        req.body.userId = decode.id;
        next();
      }
    }
  );
}

// const validateUser = (req, res, next) => {
//   const header = req.headers["authorization"];

//   if (typeof header !== "undefined") {
//     const bearer = header.split(" ");
//     const token = bearer[1];

//     req.token = token;
//     next();
//   } else {
//     res.sendStatus(403);
//   }
// };

router.post(`/`, validateUser, chatController.create);
router.get(`/`, validateUser, chatController.findChatInstance);
router.put(`/comment`, validateUser, chatController.addComment);

module.exports = router;
