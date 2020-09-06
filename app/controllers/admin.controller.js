const db = require("../models");
const pagination = require("../helpers/pagination");
const Tutorial = db.tutorials;
const Comment = db.comments;
const User = db.users;
const Op = db.Sequelize.Op;

// Get all Users for Admin
exports.findAllUsersForAdmin = (req, res) => {
  const {page, size,} = req.query;
  const {limit, offset} = pagination.getPagination(page, size);

  let options = {
    attributes: ['id', 'username', 'email', 'roleId'],
    order: [['id', 'DESC']],
    where:
      {roleId: {[Op.or]: [2, 3]}},
    include: ["role"],
    limit,
    offset
  };

  return User.findAndCountAll(options)
    .then(data => {
      const response = pagination.getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users for admin."
      });
    });
};

//Change user role by Admin
exports.updateUserRoleByAdmin = (req, res) => {
  User.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(user => {
      let roleId = user.roleId === 2 ? 3 : 2;
      user.setRole(roleId)
        .then(() => {
          res.status(200).send({message: `Role of user ${user.username} changed successfully!`});
        })
        .catch(err => {
          res.status(500).send({message: err.message});
        });
    })
    .catch(err => {
      res.status(500).send({message: err.message});
    });
};

//Delete user by Admin
exports.deleteUserByAdmin = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: {id: id}
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: "User was deleted successfully!"
        });
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

//Retrieve all Tutorials from the database for Admin
exports.findAllTutorialsForAdmin = (req, res) => {
  const {page, size} = req.query;
  const {limit, offset} = pagination.getPagination(page, size);

  return Tutorial.findAndCountAll({
    include: [{
      model: User, as: "user",
      attributes: ["username"]
    }],
    limit,
    offset
  })
    .then(data => {
      const response = pagination.getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials"
      });
    });
};

//Change tutorials status by Admin
exports.updateTutorialStatusByAdmin = (req, res) => {
  const id = req.params.id;
  Tutorial.findOne({
    where: {
      id: id
    }
  })
    .then(tutorial => {
      let status = !tutorial.published;
      Tutorial.update({published: status}, {
        where: {
          id: tutorial.id
        }
      }).then(() => {
        res.status(200).send({message: `Status of tutorial with id=${tutorial.id} changed successfully!`});
      })
        .catch(err => {
          res.status(500).send({message: err.message});
        });
    })
    .catch(err => {
      res.status(500).send({message: err.message});
    });
}

//Delete tutorial by Admin
exports.deleteTutorialByAdmin = (req, res) => {
  const id = req.params.id;

  Tutorial.destroy({
    where: {id: id}
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: `Tutorial with id=${id} was deleted successfully!`
        });
      } else {
        res.status(500).send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};

//Get the comments for a given tutorial from the database for Admin
exports.findTutorialCommentsByAdmin = (req, res) => {
  let id = req.params.id;
  return Comment.findAll({
    where: {tutorialId: id},
    include: [{
      model: User, as: "user",
      attributes: ["username"]
    }]
  })
    .then(comments => {
      res.send(comments);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error while finding comments of tutorial with id=" + id
      });
    });
}


//Delete comment by Admin
exports.deleteCommentByAdmin = (req, res) => {
  const id = req.params.id;

  Comment.destroy({
    where: {id: id}
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: `Comment with id=${id} was deleted successfully!`
        });
      } else {
        res.status(500).send({
          message: `Cannot delete Comment with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Comment with id=" + id
      });
    });
};


