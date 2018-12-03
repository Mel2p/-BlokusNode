const router = require('express').Router()
const Employees = require('./../models/users')

router.get('/', (req, res) => {
  Employees.getAll().then((employees) => res.json(employees)).catch((err) => {
    return res.status(404).send(err)
  })
})

router.get('/:id', (req, res) => {
  if (!req.params.id) return res.status(404).send('NOT FOUND')
  Employees.findOne(req.params.id).then((employee) => res.json(employee)).catch((err) => {
    return res.status(404).send(err)
  })
})

router.post('/', (req, res) => {
  if (!req.body || (req.body && (!req.body.restaurant_id || !req.body.position)))
    return res.status(404).send('NOT FOUND')

  Employees.create(req.body).then((employee) => res.json(employee)).catch((err) => {
    return res.status(404).send(err)
  })
})

router.put('/:id', (req, res) => {
  if (!req.params.id) return res.status(404).send('NOT FOUND')
  req.body.updated_at = new Date() // Update time
  req.body.id = req.params.id // Add id to body
  Employees.update(req.body).then((employee) => res.json(employee)).catch((err) => {
    return res.status(404).send(err)
  })
})

router.delete('/:id', (req, res) => {
  if (!req.params.id) return res.status(404).send('NOT FOUND')
  Employees.delete(req.params.id).then(() => res.json({ message: 'Restaurant supprimé avec succès' })).catch((err) => {
    return res.status(404).send(err)
  })
})

module.exports = router