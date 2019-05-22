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
app.use(favicon(__dirname + '/build/favicon.ico'));
// the __dirname is the current directory from where the script is running
// app.use(express.static(__dirname));
// app.use(express.static(path.join(__dirname, 'build')));
// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

schedule.scheduleJob('* * */23 * *', function(){
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

app.post('/register',(req,res)=>{
  let username=req.body.username
  let password=req.body.password
  let firstName=req.body.firstName
  let lastName=req.body.lastName
  let email=req.body.email
  models.User.findOne({
    where:{
      username:username
    }
  }).then((user)=>{
    if (user) {
        res.render('register', { message: "User name already exists!" })
      } else {
      bcrypt.hash(password, SALT_ROUNDS, function (error, hash) {
        if (error == null) {
          let user = models.User.build({
            username:username,
            password:hash,
            firstName:firstName,
            lastName:lastName,
            email:email
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

    // let user = users.find((u)=>{
    //   return u.username == username && u.password == password
    // })
    if (user) {
      jwt.sign({ username: username }, 'secret',
        function (err, token) {
          if (token) {
            res.json({ username: username, token: token })
          } else {
            res.status(500).json({ message: 'unable to generate token' })
          }
        })
    }
  })
})

app.get('/expiring', (req, res) => {
  res.json(MovieData)
})

app.listen(PORT, () => {
  console.log(`Server running at localhost:${PORT}`);
});
