const Movie = require('../models/MoviesModel')

class MoviesController {
  // todo -> CRUD Movies
  static async findAll (req, res, next) {
    try {
      const movies = await Movie.find()
      res.status(200).json(movies)
    } catch (error) {
      next(error)
    }
  }

  static async findOne (req, res, next) {
    try {
      const { id } = req.params
      const movie = await Movie.findOne(id)
      if (!movie) throw { name: 'NOT_FOUND' }
      res.status(200).json(movie)
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
      const movie = await Movie.insertOne(data)
      res.status(201).json({
        msg: `${movie.insertedCount} inserted document`,
        movie: movie.ops[0]
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
      const movie = await Movie.updateOne(id, payload)
      res.status(200).json({ msg: `${movie.modifiedCount} successfully modified document` })
    } catch (error) {
      next(error)
    }
  }

  static async delete (req, res, next) {
    try {
      const { id } = req.params
      const movie = await Movie.delete(id)
      res.status(200).json({ msg: `${movie.deletedCount} document has been deleted`})
    } catch (error) {
      next(error)
    }
  }
}

module.exports = MoviesController
