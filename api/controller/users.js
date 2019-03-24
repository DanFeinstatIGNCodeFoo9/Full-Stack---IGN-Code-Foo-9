const userModel = require(`../model/users`);
const bcrypt = require(`bcrypt`);
const jwt = require(`jsonwebtoken`);

module.exports = {
  create: function(req, res, next) {
    userModel.create(
      {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        socketId: "",
      },
      function(err, result) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: `success`,
            message: `User added successfully`,
            data: null,
          });
        }
      }
    );
  },

  authenticate: function(req, res, next) {
    userModel.findOne({ email: req.body.email }, function(err, userInfo) {
      if (err) {
        next(err);
      } else {
        if (bcrypt.compareSync(req.body.password, userInfo.password)) {
          const token = jwt.sign(
            { id: userInfo._id },
            req.app.get(process.env.SECRET)
          );
          res.json({
            status: `success`,
            message: `user found`,
            data: { user: userInfo, token: token },
          });
        } else {
          res.json({
            status: `error`,
            message: `Invalid email/password`,
            data: null,
          });
        }
      }
    });
  },

  updateSocketId: function(req, res, next) {
    userModel.findOneAndUpdate(
      {
        email: req.body.email,
      },
      {
        $set: { socketId: req.body.socketId },
      },
      function(err, socketInfo) {
        if (err) {
          next(err);
        } else {
          console.log(`success!`);
          res.json({
            status: `success`,
            message: `socketId updated`,
            data: { data: socketInfo },
          });
        }
      }
    );
  },

  findAll: function(req, res, next) {
    userModel.find({}, { name: 1, socketId: 1 }, function(err, userInfo) {
      if (err) {
        next(err);
      } else {
        res.json({
          status: `success`,
          message: `got users`,
          data: { users: userInfo },
        });
      }
    });
  },
};
