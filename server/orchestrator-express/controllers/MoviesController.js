const Movie = require('../models/MovieModel')
const redis = require('../config/redis')
const redisInvalidation = require('../helpers/redisInvalidation')

module.exports = class MoviesController {
  // todo -> findAll findOne create delete update
  static async findAll (req, res, next) {
    try {
      const cacheMovies = await redis.get('movies')
      if (cacheMovies) {
        res.status(200).json(JSON.parse(cacheMovies))
      } else {
        const movies = await Movie.findAll()
        await redis.set('movies', JSON.stringify(movies.data))
        res.status(movies.status).json(movies.data)
      }
    } catch (error) {
      next(error)
    }
  }

  static async findOne (req, res, next) {
    try {
      const { id } = req.params
      const movie = await Movie.findOne(id)
      res.status(movie.status).json(movie.data)
    } catch (error) {
      next(error)
    }
  }

  static async create (req, res, next) {
    try {
      const { title, poster_path, popularity, tags, overview } = req.body
      const payload = { title, poster_path, popularity, tags, overview }
      const create = await Movie.create(payload)
      redisInvalidation('movies', 'create', create.data.movie)
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
      const update = await Movie.update(id, payload)
      redisInvalidation('movies')
      res.status(update.status).json(update.data)
    } catch (error) {
      next(error)
    }
  }

  static async delete (req, res, next) {
    try {
      const { id } = req.params
      const del = await Movie.delete(id)
      redisInvalidation('movies')
      res.status(del.status).json(del.data)
    } catch (error) {
      next(error)
    }
  }
}