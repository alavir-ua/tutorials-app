const db = require("../models");
const pagination = require("../helpers/pagination");
const Tutorial = db.tutorials;

//Retrieve all Tutorials from the database for Author
exports.findTutorialsForAuthor = (req, res) => {

  const {page, size, userId} = req.query;
  const {limit, offset} = pagination.getPagination(page, size);

  console.log(limit, offset, userId)

  return Tutorial.findAndCountAll({
    where: {userId: userId},
    order: [['id', 'DESC']],
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

// Find a single Tutorial with an id
exports.findTutorialForAuthor = (req, res) => {
  const id = req.params.id;

  Tutorial.findByPk(id)
    .then(tutorial => {
      res.send(tutorial);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};

//Update a Tutorial by Author
exports.updateTutorialByAuthor = (req, res) => {
  Tutorial.update(req.body,
    {where: {id: req.params.id}}
  )
    .then(rows => {
      if (rows[0] === 1) return res.send({message: "Tutorial was updated successfully!"});
      return res.status(500).send({message: "Error updating Tutorial with id=" + req.params.id});
    })
    .catch(err => {
      res.status(500).send({message: err.message});
    });
}

// Create and Save a new Tutorial by Author
exports.createTutorialByAuthor = (req, res) => {

  if (!req.body.title || !req.body.description) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const tutorial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published,
    userId: req.body.userId
  };

  Tutorial.create(tutorial)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};


//Delete a Tutorial by Author
exports.deleteTutorialByAuthor = (req, res) => {
  const id = req.params.id;

  Tutorial.destroy({
    where: {id: id}
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Could not delete Tutorial with id=" + id
      });
    });
};





