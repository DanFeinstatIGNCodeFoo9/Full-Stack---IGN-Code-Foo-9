const express = require(`express`);
const router = express.Router();
const chatController = require(`../api/controller/general`);
// const app = express();
const jwt = require(`jsonwebtoken`);

function validateUser(req, res, next) {
  jwt.verify(
    req.headers["x-access-token"],
    req.app.get(process.env.SECRET),
    function(err, decoded) {
      if (err) {
        res.json({ status: "error", message: err.message, data: null });
      } else {
        // add user id to request
        req.body.userId = decoded.id;
        next();
      }
    }
  );
}

router.get(`/`, validateUser, chatController.getComments);
router.put(`/`, validateUser, chatController.addComment);

module.exports = router;
