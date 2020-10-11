const TvSeries = require('../models/TvSeriesModel')

class TvSeriesController {
  // todo -> CRUD TvSeries
  static async findAll (req, res, next) {
    try {
      const tvseries = await TvSeries.find()
      res.status(200).json(tvseries)
    } catch (error) {
      next(error)
    }
  }

  static async findOne (req, res, next) {
    try {
      const { id } = req.params
      const tvseries = await TvSeries.findOne(id)
      if (!tvseries) throw { name: 'NOT_FOUND' }
      res.status(200).json(tvseries)
    } catch (error) {
      next(error)
    }
  }

  static async create (req, res, next) {
    try {
      const { title, overview, poster_path } = req.body
      const tags = req.body.tags.split(',')
      const popularity = Number(req.body.popularity)
      const data = { title, overview, poster_path, popularity, tags }
      const tvseries = await TvSeries.insertOne(data)
      res.status(201).json({
        msg: `${tvseries.insertedCount} inserted document`,
        tvseries: tvseries.ops[0]
      })
    } catch (error) {
      next(error)
    }
  }

  static async update (req, res, next) {
    try {
      const { id } = req.params
      const { title, overview, poster_path } = req.body
      const tags = req.body.tags.split(',')
      const popularity = Number(req.body.popularity)
      const payload = { title, overview, poster_path, popularity, tags }
      const tvseries = await TvSeries.updateOne(id, payload)
      res.status(200).json({ msg: `${tvseries.modifiedCount} document has been modified` })
    } catch (error) {
      next(error)
    }
  }

  static async delete (req, res, next) {
    try {
      const { id } = req.params
      const tvseries = await TvSeries.delete(id)
      res.status(200).json({ msg: `${tvseries.deletedCount} document has been deleted`})
    } catch (error) {
      next(error)
    }
  }
}

module.exports = TvSeriesController