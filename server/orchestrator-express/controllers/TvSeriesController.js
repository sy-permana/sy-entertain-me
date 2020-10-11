const TvSeries = require('../models/TvSeriesModel')

module.exports = class MoviesController {
  // todo -> findAll findOne create delete update
  static async findAll (req, res, next) {
    try {
      const series = await TvSeries.findAll()
      res.status(series.status).json(series.data)
    } catch (error) {
      next(error)
    }
  }

  static async findOne (req, res, next) {
    try {
      const { id } = req.params
      const series = await TvSeries.findOne(id)
      res.status(series.status).json(series.data)
    } catch (error) {
      next(error)
    }
  }

  static async create (req, res, next) {
    try {
      const { title, poster_path, popularity, tags, overview } = req.body
      const payload = { title, poster_path, popularity, tags, overview }
      const create = await TvSeries.create(payload)
      res.status(create.status).json(create.data)
    } catch (error) {
      next(error)
    }
  }

  static async update (req, res, next) {
    try {
      const { id } = req.params
      const { title, poster_path, popularity, tags, overview } = req.body
      const payload = { title, poster_path, popularity, tags, overview }
      const update = await TvSeries.update(id, payload)
      res.status(update.status).json(update.data)
    } catch (error) {
      next(error)
    }
  }

  static async delete (req, res, next) {
    try {
      const { id } = req.params
      const del = await TvSeries.delete(id)
      res.status(del.status).json(del.data)
    } catch (error) {
      next(error)
    }
  }
}