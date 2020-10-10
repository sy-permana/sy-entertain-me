const router = require('express').Router()

const tvSeriesRouter = require('./tvSeriesRouter')
const moviesRouter = require('./moviesRouter')

router.get('/', (req, res) => {
  res.status(200).json({ msg: 'hello world' })
})
router.use('/tvseries', tvSeriesRouter)
router.use('/movies', moviesRouter)

module.exports = router
