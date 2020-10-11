const router = require('express').Router()
const Controller = require('../controllers/MoviesController')

router.get('/', Controller.findAll)
router.get('/:id', Controller.findOne)
router.post('/', Controller.create)
router.put('/:id', Controller.update)
router.delete('/:id', Controller.delete)

module.exports = router
