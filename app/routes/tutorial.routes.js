const controller = require("../controllers/tutorial.controller");

module.exports = function (app) {

  app.get("/api/tutorials", controller.findAllTutorials);

  app.get("/api/tutorial/:id", controller.findTutorialById);

  app.get("/api/authors", controller.findAllAuthors);

  app.get("/api/author/:id", controller.findAuthorById);

  app.get("/api/comment/:id", controller.findCommentById);

  app.post("/api/sendmail", controller.sendMail);

};





