const Movie = require('../models/MovieModel')
const TvSeries = require('../models/TvSeriesModel')

module.exports = class MainController {
  static async getMoviesAndSeries (req, res, next) {
    try {
      const movies = await Movie.findAll()
      const series = await TvSeries.findAll()
      res.status(movies.status).json({
        movies: movies.data,
        series: series.data
      })
    } catch (error) {
      next(error)
    }
  }
}