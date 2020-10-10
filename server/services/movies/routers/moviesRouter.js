const router = require('express').Router()
const Controller = require('../controllers/MoviesController')
const formValidation = require('../middlewares/formValidation')
const searchRequestedItem = require('../middlewares/searchRequested')

router.get('/', Controller.findAll)
router.get('/:id', Controller.findOne)
router.post('/', formValidation, Controller.create)
router.delete('/:id', searchRequestedItem, Controller.delete)
router.put('/:id', searchRequestedItem, formValidation, Controller.update)

module.exports = router
