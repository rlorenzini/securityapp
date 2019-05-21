const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  session = require('express-session'),
  Sequelize = require('sequelize'),
  Op = Sequelize.Op,
  // models = require('./models'),
  PORT = process.env.PORT || 8080;

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))



app.listen(PORT, () => {
  console.log(`Server running at localhost:${PORT}`);
});
