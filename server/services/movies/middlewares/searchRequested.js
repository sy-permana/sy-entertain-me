const Movie = require('../models/MoviesModel')

module.exports = searchRequestedItem = async (req, res, next) => {
  try {
    const { id } = req.params
    const movie = await Movie.findOne(id)
    if (!movie) throw { name: 'NOT_FOUND' }
    else next()
  } catch (error) {
    next(error)
  }
}