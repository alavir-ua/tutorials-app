const controller = require("../controllers/admin.controller");
const {authJwt} = require("../middleware");

module.exports = app => {
  app.all("/api/admin*", [authJwt.verifyToken, authJwt.isAdmin], function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //Get all users for Admin
  app.get("/api/admin/users", controller.findAllUsersForAdmin);

  //Change user role by Admin
  app.get("/api/admin/user/:id/update", controller.updateUserRoleByAdmin);

  //Delete user by Admin
  app.delete("/api/admin/user/:id/delete", controller.deleteUserByAdmin);

  //Get all tutorials for Admin
  app.get("/api/admin/tutorials", controller.findAllTutorialsForAdmin);

  //Change tutorials status by Admin
  app.get("/api/admin/tutorial/:id/update", controller.updateTutorialStatusByAdmin);

  //Delete tutorial by Admin
  app.delete("/api/admin/tutorial/:id/delete", controller.deleteTutorialByAdmin);

  //Change tutorials status by Admin
  app.get("/api/admin/tutorial/:id/comments", controller.findTutorialCommentsByAdmin);

  //Delete comment by Admin
  app.delete("/api/admin/comment/:id/delete", controller.deleteCommentByAdmin);

};



