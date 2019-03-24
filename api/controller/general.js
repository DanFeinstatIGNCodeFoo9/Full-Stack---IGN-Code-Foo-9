const genchatModel = require(`../model/general`);

module.exports = {
  addComment: function(req, res, next) {
    genchatModel.update(
      {},
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
  getComments: function(req, res, next) {
    genchatModel
      .find({}, function(err, commentInfo) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: `success`,
            message: `got users`,
            data: { comments: commentInfo },
          });
        }
      })
      .limit(1);
  },
};
