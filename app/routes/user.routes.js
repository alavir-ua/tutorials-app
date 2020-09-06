const controller = require("../controllers/user.controller");
const {authJwt} = require("../middleware");

module.exports = app => {
  app.all("/api/user*", [authJwt.verifyToken, authJwt.isUser], function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //Create Comment by User
  app.post("/api/user/comment/create", controller.createCommentByUser);

  //Get User
  app.get("/api/user/:id", controller.getUserById);

  //Delete user by User
  app.delete("/api/user/:id/delete", controller.deleteUserByUser);

  //Update user by User
  app.put("/api/user/update", controller.updateUserByUser);

};





