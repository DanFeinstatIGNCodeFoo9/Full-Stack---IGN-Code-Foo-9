const chatModel = require(`../model/chats`);

module.exports = {
  create: function(req, res, next) {
    chatModel.create(
      {
        authorOne: req.body.authorOne,
        authorTwo: req.body.authorTwo,
        comments: [],
      },
      function(err, success) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: `success`,
            message: `new chat created`,
            data: null,
          });
        }
      }
    );
  },
  findChatInstance: function(req, res, next) {
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
