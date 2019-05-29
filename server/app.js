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
  NewMovieData = require('./newMovies.json'),
  bcrypt = require('bcrypt'),
  SALT_ROUNDS = 10,
  myPlaintextPassword = 's0/\/\P4$$w0rD',
  someOtherPlaintextPassword = 'not_bacon',
  schedule = require('node-schedule'),
  PORT = process.env.PORT || 8080;

const keys = require('./.env.json')
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  port: 587,
  auth: {
    user: 'no.reply.last.call7@gmail.com',
    pass: keys.EMAIL_PASSWORD
  }
});



app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// app.use(express.static(__dirname + "/public"))

// app.get('/', function (req, res) {
//   const index = path.join(__dirname, 'build', 'index.html');
//   res.sendFile(index);
// });
function emailUsers() {
  models.User.findAll()
    .then((allUsers) => {
      allUsers.forEach(user => {
        let userid = user.dataValues.id
        let userEmail = user.dataValues.email
        models.WatchList.findAll({
          where: {
            userid: userid
          }
        })
          .then((userMovies) => {
            let userExp = servFindExp(userMovies, MovieData)
            let mailer = []
            userExp.forEach((movie) => {
              let count = getDays(movie.date)
              if (count === 30 && count > 0) {
                let movieItem = {
                  title: movie.title,
                  date: movie.date,
                  counter: getDays(movie.date)
                }
                mailer.push(movieItem)
              }
              if (count === 14 && count > 0) {
                let movieItem = {
                  title: movie.title,
                  date: movie.date,
                  counter: getDays(movie.date)
                }
                mailer.push(movieItem)
              }
              if (count === 2 && count > 0) {
                let movieItem = {
                  title: movie.title,
                  date: movie.date,
                  counter: getDays(movie.date)
                }
                mailer.push(movieItem)
              }


            })
            console.log(mailer)
            if (mailer.length != 0) {
              let text = mailer.map((movie) => {
                return `
                          <h3>${movie.title} will be leaving Netflix on ${movie.date} in ${movie.counter} days</h3>
                  `
              })
              let mailOptions = {
                from: 'no.reply.last.call7@gmail.com',
                to: userEmail,
                subject: 'Movies on your Watch List are going away!',
                html: text.join('')
              };

              transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
            }
          })
      })
    })

}

schedule.scheduleJob('15 9 * * *', function () {
  console.log('Daily API call initiated.');
  unirest.get("https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?q=get:exp:US&t=ns&st=adv&p=1")
    .header("X-RapidAPI-Host", "unogs-unogs-v1.p.rapidapi.com")
    .header("X-RapidAPI-Key", `${keys.RICHARD_UNOGS_KEY} `)
    .end(function (result) {
      console.log(result.status, result.headers);
      let data = JSON.stringify(result.body)
      fs.writeFile('./movieData.json', data)
    });
})
schedule.scheduleJob('12 16 * * *', function () {
  console.log('Daily API call initiated.');
  unirest.get("https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?q=get:new7:US&p=1&t=ns&st=adv")
    .header("X-RapidAPI-Host", "unogs-unogs-v1.p.rapidapi.com")
    .header("X-RapidAPI-Key", `${keys.MIKE_UNOGS_KEY} `)
    .end(function (result) {
      console.log(result.status, result.headers);
      let data = JSON.stringify(result.body)
      fs.writeFile('./newMovies.json', data)
    });
})

schedule.scheduleJob('16 9 * * *', function () {
  emailUsers()
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
app.get('/expiring', (req, res) => {
  res.json(MovieData)
})
app.get('/new-releases', (req, res) => {
  res.json(NewMovieData)
})
app.get('/username', authenticate, (req, res) => {
  res.send(currentUser[currentUser.length - 1])
})

app.post('/register', (req, res) => {
  let username = req.body.username
  let password = req.body.password
  let firstName = req.body.firstName
  let lastName = req.body.lastName
  let email = req.body.email

  let emailRegEx = RegExp('/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/')
  //standard email format
  let userRegEx = RegExp('([a-zA-Z0-9]{6,20})$')
  //username can contain a-z, A-Z, and 0-9, and has to be between
  //six and twenty digits
  let pwdRegEx = RegExp('(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{8,20})$')
  //password CANNOT start with a number
  //password CANNOT be just letters
  //password must contain one lowercase letter, one uppercase letter, one number,
  //and must be between eight to twenty digits long
  if (userRegEx.test(username) === true && pwdRegEx.test(password) === true && emailRegEx.test(email) === true) {
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
  } else {
    let message = "Username, password, or email is incorrect! Username must be 6-20 characters. Password must be 6-20 characters with one uppercase and lowercase letter and at least one number."
    res.status(500).json({ message: message })
  }
})

app.post('/login', (req, res) => {
  let username = req.body.username
  let password = req.body.password
  models.User.findOne({
    where: {
      username: username
    }
  }).then((user) => {

    if (user) {
      bcrypt.compare(password, user.password, (error, result) => {
        if (result) {
          jwt.sign({ username: username }, 'secret',
            function (error, token) {
              if (token) {
                res.json({ username: username, token: token, id: user.id, status: 200 })
              } else {
                res.status(500).json({ message: 'unable to generate token', status: 500 })
              }
            })
        }
        else {
          let message = "wrong username and password"
          res.status(500).json({ message: message, status: 500 })
          console.log("wrong username and password")
        }
      })
    }
  })
  // .catch(()=>{
  //   let message = "wrong username and password"
  //   res.status(500).json({message:message})
  // })
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
  console.log(`Server running at localhost: ${PORT} `);
});


function servFindExp(watchList, expiredList) {
  // console.log('[Expired List 226]' + expiredList.ITEMS[0].imdbid)
  let result = watchList.map((wLMovie) => {
    // console.log('[Watch List 228]' + wLMovie.dataValues.imbdid)
    for (let i = 0; i < expiredList.ITEMS.length; i++) {
      if (wLMovie.dataValues.imdbid === expiredList.ITEMS[i].imdbid) {
        return {
          title: wLMovie.dataValues.title,
          imdbid: wLMovie.dataValues.imdbid,
          date: expiredList.ITEMS[i].unogsdate
        }
      }
    }
    return {
      title: wLMovie.dataValues.title,
      imdbid: wLMovie.dataValues.imdbid,
      date: "-"
    }
  })
  // console.log(result)
  return result
}

function getDays(exp) {
  if (exp === "-") {
    return "Available"
  }
  let today = new Date()
  let one_day = 1000 * 60 * 60 * 24
  let goneDate = new Date(exp)
  return Math.ceil((goneDate - today.getTime()) / one_day)
}
// api endpoint new releases: "https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?q=get:new7:US&p=1&t=ns&st=adv"