const express = require('express'),
  favicon = require('express-favicon'),
  app = express(),
  unirest = require('unirest'),
  fs = require('file-system'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  path = require('path'),
  Sequelize = require('sequelize'),
  Op = Sequelize.Op,
  models = require('./models'),
  jwt = require('jsonwebtoken'),
  MovieData = require('./movieData.json'),
  bcrypt = require('bcrypt'),
  SALT_ROUNDS = 10,
  myPlaintextPassword = 's0/\/\P4$$w0rD',
  someOtherPlaintextPassword = 'not_bacon',
  schedule = require('node-schedule'),
  PORT = process.env.PORT || 8080;

const keys = require('./.env.json')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + "/public"))

app.get('*', function (req, res) {
  const index = path.join(__dirname, 'build', 'index.html');
  res.sendFile(index);
});

schedule.scheduleJob('15 9 * * *', function () {
  console.log('Daily API call initiated.');
  unirest.get("https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?q=get:exp:US&t=ns&st=adv&p=1")
    .header("X-RapidAPI-Host", "unogs-unogs-v1.p.rapidapi.com")
    .header("X-RapidAPI-Key", `${keys.RICHARD_UNOGS_KEY}`)
    .end(function (result) {
      console.log(result.status, result.headers);
      //console.log(result.body) to see all data
      let data = JSON.stringify(result.body)
      fs.writeFile('./movieData.json', data)
    });
})

app.get('/expiring', (req, res) => {
  res.json(MovieData)
})

function authenticate(req, res, next) {
  let headers = req.headers["authorization"]

  let token = headers.split(' ')[1]

  jwt.verify(token, 'secret', (err, decoded) => {
    if (decoded) {
      if (decoded.username) {
        next()
      } else {
        res.status(401).json({ message: 'Token invalid' })
      }
    } else {
      res.status(401).json({ message: 'Token invalid' })
    }
  })
}

app.get('/username', authenticate, (req, res) => {
  res.send(currentUser[currentUser.length - 1])
})

app.post('/register', (req, res) => {
  let username = req.body.username
  let password = req.body.password
  let firstName = req.body.firstName
  let lastName = req.body.lastName
  let email = req.body.email
  models.User.findOne({
    where: {
      username: username
    }
  }).then((user) => {
    if (user) {
      res.render('register', { message: "User name already exists!" })
    } else {
      bcrypt.hash(password, SALT_ROUNDS, function (error, hash) {
        if (error == null) {
          let user = models.User.build({
            username: username,
            password: hash,
            firstName: firstName,
            lastName: lastName,
            email: email
          })
          user.save()
        }
      })
    }
  })
})

app.post('/login', (req, res) => {
  let username = req.body.username
  let password = req.body.password
  console.log(username, password)
  models.User.findOne({
    where: {
      username: username
    }
  }).then((user) => {

    if (user) {
      jwt.sign({ username: username }, 'secret',
        function (err, token) {
          if (token) {
            res.json({ username: username, token: token, id: user.id })
          } else {
            res.status(500).json({ message: 'unable to generate token' })
          }
        })
    }
  })
})

app.post('/add-movie', (req, res) => {
  let title = req.body.title
  let imdbID = req.body.imdbID
  let userid = parseInt(req.body.userid)

  let movie = models.WatchList.build({
    title: title,
    imdbid: imdbID,
    userid: userid
  })
  movie.save().then((savedMovie) => {
  })
    .then(() => {
      models.WatchList.findAll({
        where: {
          userid: userid
        }
      })
        .then(result => {
          res.json(result)
        })
    }).catch(error => res.json({ success: false, message: "Movie was NOT added" }))
})

//Getting USER WATCHLIST
app.post('/user-watch-list', (req, res) => {
  let userid = req.body.userid
  // console.log(userid)
  models.WatchList.findAll({
    where: {
      userid: userid
    }
  })
    .then(result => {
      res.json(result)
    }).catch(error => res.json({ success: false, message: "User Watch List cannot be retrieved." }))
})
// Deleting movie from watchlist
app.post('/delete-movie', (req, res) => {
  deleteID = req.body.imdbid
  userid = req.body.userid
  models.WatchList.destroy({
    where: {
      userid: userid,
      imdbid: deleteID
    }
  }).then(() => {
    models.WatchList.findAll({
      where: {
        userid: userid
      }
    })
      .then(result => {
        res.json(result)
      })
  }).catch(error => res.json({ success: false, message: "Movie was NOT added" }))

})

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
});


app.listen(PORT, () => {
  console.log(`Server running at localhost:${PORT}`);
});
