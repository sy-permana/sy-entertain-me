const Movie = require('../models/MoviesModel')
const TvSeries = require('../models/TvSeriesModel')


module.exports = searchRequestedItem = async (req, res, next) => {
  const movies = '/movies'
  const tvseries = '/tvseries'
  const { id } = req.params
  switch(req.baseUrl) {
    case movies: {
      try {
        const movie = await Movie.findOne(id)
        if (!movie) throw { name: 'NOT_FOUND' }
        else next()
      } catch (error) {
        next(error)
      }
    }
    case tvseries: {
      try {
        const tvseries = await TvSeries.findOne(id)
        if (!tvseries) throw { name: 'NOT_FOUND' }
        else next()
      } catch (error) {
        next(error)
      }
    }
  }
}