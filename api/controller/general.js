const genchatModel = require(`../model/general`);

module.exports = {
  // create: function()
  addComment: function(req, res, next) {
    genchatModel
      .create({
        message: req.body.message,
        userId: req.body.userId,
        name: req.body.name,
        date: req.body.date,
      })
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
  },
  getComments: function(req, res, next) {
    genchatModel
      .find()
      .sort({ _id: -1 })
      .limit(50)
      .then(dbModel => {
        console.log(dbModel);
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },
};
