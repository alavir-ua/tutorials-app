const process = require('process');
const bodyParser = require("body-parser");
const express = require("express");
const app = express();

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

//require('dotenv').config();

const db = require("./app/models");
db.sequelize.sync();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

require('./app/routes/tutorial.routes')(app);
require('./app/routes/auth.routes')(app);
require('./app/routes/admin.routes')(app);
require('./app/routes/author.routes')(app);
require('./app/routes/user.routes')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});








