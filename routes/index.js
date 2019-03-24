const express = require(`express`);
const router = express.Router();
const userRoutes = require(`./users`);
const chatRoutes = require(`./chats`);
const genRoutes = require(`./general`);
// const app = express();
// const jwt = require(`jsonwebtoken`);

// function validateUser(req, res, next) {
//   jwt.verify(
//     req.headers[`x-access-token`],
//     req.app.get(process.env.SECRET),
//     function(err, decode) {
//       if (err) {
//         res.json({ status: "error", message: err.message, data: null });
//       } else {
//         req.body.userId = decode.id;
//         next();
//       }
//     }
//   );
// }

router.use(`/api/user`, userRoutes);

//private routes
router.use(`/api/chat`, chatRoutes);
router.use(`/api/ffa`, genRoutes);

module.exports = router;
