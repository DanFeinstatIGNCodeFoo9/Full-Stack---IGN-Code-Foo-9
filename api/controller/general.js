const genchatModel = require(`../model/general`);

module.exports = {
  // create: function()
  addComment: function(req, res, next) {
    genchatModel
      .create({
        message: req.body.message,
        name: req.body.name,
        date: req.body.date,
      })
      .then(user => res.json(user))
      .catch(err => res.status(422).json(err));
  },
  getComments: function(req, res, next) {
    genchatModel
      .find({})
      .sort({ _id: -1 })
      .limit(50)
      .then(genchatHistory => res.json(genchatHistory))
      .catch(err => res.status(422).json(err));
  },
};
