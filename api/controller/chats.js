// const http = require(`http`).Server(app);
// const io = require(`socket.io`)(http);
const chatModel = require(`../model/chats`);
const jwt = require(`jsonwebtoken`);

module.exports = {
  create: function(req, res, next) {
    jwt.verify(req.token, process.env.SECRET, (err, authorizedData) => {
      if (err) {
        //If error send Forbidden (403)
        console.log("ERROR: Could not connect to the protected route");
        res.sendStatus(403);
      } else {
        chatModel.create(
          {
            authorOne: req.body.authorOne,
            authorTwo: req.body.authorTwo,
            room: `${req.body.authorOne} ${req.body.authorTwo}`,
            comments: [],
          },
          function(err, success) {
            if (err) {
              next(err);
            } else {
              res.json({
                status: `success`,
                message: `new chat created`,
                data: { data: success },
              });
            }
          }
        );
      }
    });
  },
  findChatInstance: function(req, res, next) {
    jwt.verify(req.token, process.env.SECRET, (err, authorizedData) => {
      if (err) {
        //If error send Forbidden (403)
        console.log("ERROR: Could not connect to the protected route");
        res.sendStatus(403);
      } else {
        chatModel.find(
          {
            authorOne: req.body.authorOne,
            authorTwo: req.body.authorTwo,
          },
          function(err, chatInfo) {
            if (err) {
              next(err);
            } else {
              res.json({
                status: `success`,
                message: `Chat found`,
                data: { chat: chatInfo },
              });
            }
          }
        );
      }
    });
  },
  addComment: function(req, res, next) {
    jwt.verify(req.token, process.env.SECRET, (err, authorizedData) => {
      if (err) {
        //If error send Forbidden (403)
        console.log("ERROR: Could not connect to the protected route");
        res.sendStatus(403);
      } else {
        chatModel.findOneAndUpdate(
          {
            authorOne: req.body.authorOne,
            authorTwo: req.body.authorTwo,
          },
          {
            $push: {
              comments: req.body.comment,
            },
          },
          function(err, commentInfo) {
            if (err) {
              next(err);
            } else {
              console.log(`success!`);
              res.json({
                status: `success`,
                message: `Comment added`,
                data: { comment: commentInfo },
              });
            }
          }
        );
      }
    });
  },
};
