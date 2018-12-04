const router = require('express').Router()
const api = require ('axios')
var passport = require('passport');
var bcrypt = require('bcryptjs');
const User = require('./../models/user')
var mongoose = require('mongoose');


router.post('/connect', (req, res) => {
  let usernameParam = req.body.username
  let passwordParam = req.body.password

  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(passwordParam, salt, function(err, hash) {
        passwordParam = hash
    });
  });

  User.findOne({username : usernameParam}).then((user) => {
    bcrypt.compare(user.password, passwordParam, function(err, res) {
      res = true
    });
    if (res) {
      res.json({co : true})
    }
    else {
      return res.status(401)
    }
  })
    .catch((err) => {
      console.log('raté')
      return res.status(401).send(err)
  })
})
 
router.get('/user/:username', (req, res) => {
  /*let user_id
  console.log('Je passe')
  User.findOne({username : req.params.username}).then((user) => {
    user_id = user.id
    console.log('user_id' ,user_id)
  }).catch((err) => {
    return res.status(404).send(err)
  }).then(() => {*/
  if (!req.params.username) return res.status(404).send('NOT FOUND')
  console.log('2')
  api.get('localhost::8044/user/'+ req.param.username +'/winrate').then((user_wr) => {
  console.log('user_wr')
  console.log(user_wr)
    res.json(user_wr).catch((err) => {
      console.log('kc')
      return res.status(404).send(err)
    })
    //}) 
  })
})

router.get('/newgame/:game_id', (req, res) => {
  res.json(cheat)
})

router.get('/newgame2/:username', (req, res) => {
  let game_id
  let user_id
  let cheat = 
  User.findOne({username : req.params.username}).then((user) => {
    user_id = user.id
    console.log('user_id: ' ,user_id)
  }).catch((err) => {
    return res.status(404).send(err)
  }).then(() => {
  api.post('localhost::8021/games/'+ user_id).then((newGame) => {
    game_id = newGame.data.id
    console.log('newGame: ', newGame.data)
    console.log('newGame.data.id: ', newGame.data.id)
  })
  .catch(function (error) {
    console.log(error);
  }).then(() => {
    console.log('game_id2: ', game_id)
    api.get('localhost:8043/game/new/' + game_id).then((info) => {
    console.log('INFO: ', info)
    res.json(info.data).catch((err) => {
      return res.status(404).send(err)
    })
  }).catch((err) => {
    return res.status(404).send(err)
  })
  }).catch((err) => {
    return res.status(404).send(err)
  })
  }).catch((err) => {
    return res.status(404).send(err)
  })
})




module.exports = router