const router = require('express').Router()

const Controller = require('../controllers')
const tvSeriesRouter = require('./tvSeriesRouter')
const moviesRouter = require('./moviesRouter')

router.get('/', (req, res) => {
  res.status(200).json({
    msg: 'welcome to EntertainMe'
  })
})
router.get('/entertainme', Controller.getMoviesAndSeries)
router.use('/series', tvSeriesRouter)
router.use('/movies', moviesRouter)

module.exports = router
