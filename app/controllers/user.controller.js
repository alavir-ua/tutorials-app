const bcrypt = require("bcryptjs");
const db = require("../models");
const Comment = db.comments;
const Role = db.roles;
const User = db.users;

// Create and Save a new Comment by User
exports.createCommentByUser = (req, res) => {

  console.log(req.body)
  if (!req.body.text) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const comment = {
    text: req.body.text,
    tutorialId: req.body.tutorialId,
    userId: req.body.userId
  };

  Comment.create(comment)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Comment"
      });
    });
};

exports.getUserById = (req, res) => {
  User.findByPk(req.params.id, {
    attributes: ["id", "username", "email"],
    include: [{
      model: Role, as: "role",
      attributes: ["name"]
    }]
  })
    .then(user => {
      console.log(user)
      if (!user) return res.status(404).send({message: "User Not found."});
      res.send(user);
    })
    .catch(err => {
      res.status(500).send({message: err.message});
    });
}

//Delete user by User
exports.deleteUserByUser = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: {id: id}
  })
    .then(num => {
      if (num === 1) {
        res.send({num: 1});
      } else {
        res.status(500).send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};

//Update User by User
exports.updateUserByUser = (req, res) => {
  const data = {
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  }

  console.log(data)

  User.update(data,
    {where: {id: req.body.id}}
  )
    .then(rows => {
      if (rows[0] === 1) return res.send({message: "Your data has been updated successfully!"});
      return res.status(500).send({message: "Error updating data!"});
    })
    .catch(err => {
      res.status(500).send({message: err.message});
    });
}



