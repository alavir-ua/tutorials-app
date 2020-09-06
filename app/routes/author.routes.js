const controller = require("../controllers/author.controller");
const {authJwt} = require("../middleware");

module.exports = app => {
  app.all("/api/author*", [authJwt.verifyToken, authJwt.isAuthor], function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //Get all tutorials for Author
  app.get("/api/authors/tutorials", controller.findTutorialsForAuthor);

  //Get Tutorial for Author by Id
  app.get("/api/author/tutorial/:id", controller.findTutorialForAuthor);

  //Update Tutorial by Author
  app.put("/api/author/tutorial/:id/update", controller.updateTutorialByAuthor);

  //Delete Tutorial by Author
  app.delete("/api/author/tutorial/:id/delete", controller.deleteTutorialByAuthor);

  //Create Tutorial by Author
  app.post("/api/author/tutorial/create", controller.createTutorialByAuthor);

};





