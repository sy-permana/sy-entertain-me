const router = require('express').Router()

const tvSeriesRouter = require('./tvSeriesRouter')

router.get('/', (req, res) => {
  res.status(200).json({
    msg: 'service for Tv Series'
  })
})

router.use('/series', tvSeriesRouter)

module.exports = router
