const db = require("../models");
const process = require("process");
const User = db.users;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    roleId: 3
  })
    .then(user => {
      if (!user) return res.send({message: "Some error occurred while creating the User"});
      res.send({message: "User was registered successfully!"});
    })
    .catch(err => {
      res.status(500).send({message: err.message});
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({message: "User Not found."});
      }

      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {
        expiresIn: 86400 // 24 hours
      });

      user.getRole().then(role => {
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          role: role.name,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({message: err.message});
    });
};





