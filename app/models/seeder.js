const process = require('process');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const faker = require('faker');
const bcrypt = require("bcryptjs");
const db = require("./index");
const controller = require("../controllers/tutorial.controller");

const run = async () => {

  await controller.createRole({
    id: 1,
    name: "admin"
  });

  await controller.createRole({
    id: 2,
    name: "author"
  });

  await controller.createRole({
    id: 3,
    name: "user"
  });


  await controller.createUser(1,{
    username: "Admin",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("111111", 8),
  });

  await controller.createUser(2,{
    username: "Author",
    email: "author@gmail.com",
    password: bcrypt.hashSync("222222", 8),
  });

  for (let i = 3; i < 7; i++) {
    await controller.createUser(2,{
      username: faker.name.findName(),
      email: faker.internet.email(),
      password: bcrypt.hashSync("222222", 8),
    });
  }

  await controller.createUser(3,{
    username: "User",
    email: "user@gmail.com",
    password: bcrypt.hashSync("333333", 8),
  });

  for (let i = 8; i < 17; i++) {
    await controller.createUser(3,{
      username: faker.name.findName(),
      email: faker.internet.email(),
      password: bcrypt.hashSync("333333", 8),
    });
  }

  for (let i = 2; i < 12; i++) {
    let userId = null;
    if (i < 7) {
      userId = i;
    } else if (6 < i < 12) {
      userId = i - 5;
    }

    await controller.createTutorial(userId, {
      //title: `Tutorial #${i - 1}`,
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraphs(),
      published: faker.random.boolean(),
    });
  }

  for (let i = 1; i < 18; i++) {
    let tutorialId = null;
    if (i < 11) {
      tutorialId = i;
    } else {
      tutorialId = i - 8;
    }

    let userId = null;
    if (i < 11) {
      userId = i + 6;
    } else if (10 < i < 18) {
      userId = i - 4;
    }

    await controller.createComment(tutorialId, userId, {
      text: faker.lorem.paragraph()
    });

  }
};

// db.sequelize.sync();
db.sequelize.sync({force: true}).then(() => {
  console.log("Drop and re-sync db.");
  run();
});


