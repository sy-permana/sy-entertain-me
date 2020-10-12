const TvSeries = require('../models/TvSeriesModel')
const redis = require('../config/redis')
const redisInvalidation = require('../helpers/redisInvalidation')

module.exports = class TvSeriesController {
  // todo -> findAll findOne create delete update
  static async findAll (req, res, next) {
    try {
      const cacheSeries = await redis.get('series')
      if (cacheSeries) {
        res.status(200).json(JSON.parse(cacheSeries))
      } else {
        const series = await TvSeries.findAll()
        await redis.set('series', JSON.stringify(series.data))
        res.status(series.status).json(series.data)
      }
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
      redisInvalidation('series', 'create', create.data.tvseries)
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
      redisInvalidation('series')
      res.status(update.status).json(update.data)
    } catch (error) {
      next(error)
    }
  }

  static async delete (req, res, next) {
    try {
      const { id } = req.params
      const del = await TvSeries.delete(id)
      redisInvalidation('movies', 'delete', id)
      redisInvalidation('series')
      res.status(del.status).json(del.data)
    } catch (error) {
      next(error)
    }
  }
}