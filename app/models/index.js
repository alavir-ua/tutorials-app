const process = require("process");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DIALECT,
  operatorsAliases: 0,

  pool: {
    max: parseInt(process.env.POOL_MAX),
    min: parseInt(process.env.POOL_MIN),
    acquire: parseInt(process.env.POOL_ACQUIRE),
    idle: parseInt(process.env.POOL_IDLE)
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
db.comments = require("./comment.model.js")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);
db.roles = require("./role.model.js")(sequelize, Sequelize);

db.users.belongsTo(db.roles, {
  foreignKey: "roleId",
  as: "role",
});

db.roles.hasMany(db.users, { as: "users" });

db.users.hasMany(db.tutorials, { as: "tutorials" });

db.tutorials.belongsTo(db.users, {
  foreignKey: "userId",
  as: "user",
  onDelete: 'cascade',
  hooks: true
});

db.tutorials.hasMany(db.comments, { as: "comments" });


db.comments.belongsTo(db.tutorials, {
  foreignKey: "tutorialId",
  as: "tutorial",
  onDelete: 'cascade',
  hooks: true
});

db.comments.belongsTo(db.users, {
  foreignKey: "userId",
  as: "user",
  onDelete: 'cascade',
  hooks: true
});

module.exports = db;





