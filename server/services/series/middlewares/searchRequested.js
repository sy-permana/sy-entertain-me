const TvSeries = require('../models/TvSeriesModel')


module.exports = searchRequestedItem = async (req, res, next) => {
  const { id } = req.params
  try {
    const tvseries = await TvSeries.findOne(id)
    if (!tvseries) throw { name: 'NOT_FOUND' }
    else next()
  } catch (error) {
    next(error)
  }
}