const { Series } = require('../config/axios')

module.exports = class TvSeries {
  // todo -> findAll findOne create update delete
  static findAll () {
    return Series({
      method: 'GET',
      url: '/series'
    })
  }
}