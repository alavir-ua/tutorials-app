const db = require("../models");
const process = require("process");
const nodemailer = require("nodemailer");
const pagination = require("../helpers/pagination");
const Tutorial = db.tutorials;
const Comment = db.comments;
const Role = db.roles;
const User = db.users;
const Op = db.Sequelize.Op;

exports.createRole = (role) => {
  return Role.create({
    id: role.id,
    name: role.name
  }).then((role) => {
    console.log(">> Created role: " + JSON.stringify(role, null, 4));
    return role;
  })
    .catch((err) => {
      console.log(">> Error while creating role: ", err);
    });
};


//Create and Save new Users
exports.createUser = (roleId, user) => {
  return User.create({
    username: user.username,
    email: user.email,
    password: user.password,
    roleId: roleId,
  }).then((user) => {
    console.log(">> Created user: " + JSON.stringify(user, null, 4));
    return user;
  })
    .catch((err) => {
      console.log(">> Error while creating user: ", err);
    });
};

//Create and Save new Tutorial
exports.createTutorial = (userId, tutorial) => {
  return Tutorial.create({
    title: tutorial.title,
    description: tutorial.description,
    published: tutorial.published,
    userId: userId
  })
    .then((tutorial) => {
      console.log(">> Created tutorial: " + JSON.stringify(tutorial, null, 4));
      return tutorial;
    })
    .catch((err) => {
      console.log(">> Error while creating tutorial: ", err);
    });
};

//Create and Save new Comment
exports.createComment = (tutorialId, userId, comment) => {
  return Comment.create({
    name: comment.name,
    text: comment.text,
    tutorialId: tutorialId,
    userId: userId,
  })
    .then((comment) => {
      console.log(">> Created comment: " + JSON.stringify(comment, null, 4));
      return comment;
    })
    .catch((err) => {
      console.log(">> Error while creating comment: ", err);
    });
};

// Retrieve all published Tutorials from the database.
exports.findAllTutorials = (req, res) => {
  const {title, page, size} = req.query;
  const {limit, offset} = pagination.getPagination(page, size);

  let options = {};

  if (title) {
    options = {
      where:
        {
          published: {[Op.eq]: 1},
          title: {[Op.like]: `%${title}%`}
        },
      limit,
      offset
    }
  } else {
    options = {
      where:
        {published: 1},
      include: [{
        model: User, as: "user",
        attributes: ["username"]
      }],
      limit,
      offset
    }
  }

  return Tutorial.findAndCountAll(options)
    .then(data => {
      const response = pagination.getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};


//Get the comments for a given tutorial
exports.findTutorialById = (req, res) => {
  let id = req.params.id;
  return Tutorial.findByPk(id, {
    include: [{
      model: User, as: "user",
      attributes: ["username"]
    }, {
      model: Comment, as: "comments",
      attributes: ["id"]
    }]
  })
    .then((tutorial) => {
      res.send(tutorial);
    })
    .catch(err => {
      console.log(err);
    });
};

// Get all Authors include tutorials
exports.findAllAuthors = (req, res) => {
  const {username, page, size,} = req.query;
  const {limit, offset} = pagination.getPagination(page, size);

  let options = {};

  if (username) {
    options = {
      attributes: ['id', 'username', "roleId"],
      where:
        {
          roleId: {[Op.eq]: 2},
          username: {[Op.like]: `%${username}%`}
        },
      limit,
      offset
    }
  } else {
    options = {
      attributes: ['id', 'username'],
      where:
        {roleId: {[Op.eq]: 2}},
      limit,
      offset
    }
  }

  return User.findAndCountAll(options)
    .then(data => {
      const response = pagination.getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving authors."
      });
    });
};

//Get Author by Id include tutorials
exports.findAuthorById = (req, res) => {
  let authorId = req.params.id;
  return User.findByPk(authorId, {
    attributes: ['id', 'username'],
    where: {roleId: 2},
    include: ["tutorials"]
  })
    .then((author) => {
      res.json(author);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error while finding author"
      });
    });
};


//Get the comment by id
exports.findCommentById = (req, res) => {
  let id = req.params.id;
  return Comment.findByPk(id, {
    include: [{
      model: User, as: "user",
      attributes: ["username"]
    }],
  }).then((comment) => {
    res.send(comment);
  })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error while finding comment"
      });
    });
};

// Send the email
exports.sendMail = (req, res) => {
  console.log(req.body)
  const email = req.body.email;
  const text = req.body.text;

  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_NAME,
      pass: process.env.SMTP_PASSWORD
    }
  });

  const data = {
    from: process.env.SMTP_NAME,
    to: process.env.ADMIN_MAIL,
    subject: `Mail from user ${email}`,
    html: `<p>${text}</p>`
  }

  transporter.sendMail(data, (error, result) => {
    if (error) return res.send({message: "Some error occurred while sending email!"});
    res.send({message: "Email was sent successfully."});
    console.log(result)
  });

};







