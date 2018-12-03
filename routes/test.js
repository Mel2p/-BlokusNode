const router = require('express').Router()
const api = require ('axios')
const User = require('./../models/user')
var mongoose = require('mongoose');



router.post('/user', (req, res) => {
  console.log('req' + req.body)
  User.create(req.body).then((user) => res.json(user)).catch((err) => {
    console.log(user)
    return res.status(404).send(err)
  })
})

router.post('/co', (req, res) => {
  if (req.isAuthenticated()){
    res.json({co : true}).catch((err) => {
      return res.status(404).send(err)
    })
  }
  else {
    return res.status(401).send(err)  
  }
})
 
router.get('/user/:username', async(req, res) => {
  if (!req.params.username) return res.status(404).send('NOT FOUND')
  let wr = await api.get('localhost:8044/user/'+ req.params.username +'/winrate')

  User.findById(req.params.username.then((user) => res.json(user, wr)).catch((err) => {
    return res.status(404).send(err)
  }))
})

router.get('/newgame/:user_id', async(req, res) => {
  if (req.isAuthenticated()){
    let info = await api.get('localhost:8043/game/new/'+ req.params.user_id)

    res.json(info).catch((err) => {
      return res.status(404).send(err)
    })
  }
  else {
    return res.status(401).send(err)
  }
})

router.get('/endturn/:game_id/:piece_id', async(req, res) => {
  await api.get('localhost:8041/game/'+ req.param.game_id +'/next_turn')
  let gameAndPieces = await api.get('localhost:8042/game/'+ req.param.game_id+ '/'+ req.param.piece_id +'/place_piece')
  
  res.json(gameAndPieces).catch((err) => {
    return res.status(404).send(err)
  })
})



module.exports = router