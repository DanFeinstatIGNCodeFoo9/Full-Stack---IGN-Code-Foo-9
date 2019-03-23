const express = require(`express`);
const router = express.Router();
const userRoutes = require(`./users`);
const chatRoutes = require(`./chats`);
const app = express();
const jwt = require(`jsonwebtoken`);

function validateUser(req, res, next) {
  jwt.verify(req.headers[`x-access-token`], req.app.get(`secretKey`), function(
    err,
    decode
  ) {
    if (err) {
      res.json({ status: "error", message: err.message, data: null });
    } else {
      req.body.userId = decode.id;
      next();
    }
  });
}

router.use(`/api/user`, userRoutes);

//private route
router.use(`/api/chat`, validateUser, chatRoutes);

module.exports = router;
