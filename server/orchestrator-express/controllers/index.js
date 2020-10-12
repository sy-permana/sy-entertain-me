const Movie = require('../models/MovieModel')
const TvSeries = require('../models/TvSeriesModel')
const redis = require('../config/redis')

module.exports = class MainController {
  static async getMoviesAndSeries (req, res, next) {
    try {
      const cacheMovies = await redis.get('movies')
      const cacheSeries = await redis.get('series')
      if (cacheMovies && cacheSeries) {
        res.status(200).json({
          movies: JSON.parse(cacheMovies),
          series: JSON.parse(cacheSeries)
        })
      } else {
        const movies = await Movie.findAll()
        const series = await TvSeries.findAll()
        await redis.set('movies', JSON.stringify(movies.data))
        await redis.set('series', JSON.stringify(series.data))
        res.status(200).json({
          movies: movies.data,
          series: series.data
        })
      }
    } catch (error) {
      next(error)
    }
  }
}