const chatModel = require(`../model/chats`);
const jwt = require(`jsonwebtoken`);

module.exports = {
  create: function(req, res, next) {
    chatModel
      .create({
        authorOne: req.body.authorOne,
        authorTwo: req.body.authorTwo,
        room: `${req.body.authorOne} ${req.body.authorTwo}`,
        comments: [],
      })
      .then(chatData => res.json(chatData))
      .catch(err => res.status(422).json(err));
  },
  findChatInstance: function(req, res, next) {
    jwt.verify(req.token, process.env.SECRET, (err, authorizedData) => {
      if (err) {
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
  },
};
