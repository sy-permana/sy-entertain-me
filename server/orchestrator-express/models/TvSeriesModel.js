const { Series } = require('../config/axios')

module.exports = class TvSeries {
  // todo -> findAll findOne create update delete
  static findAll () {
    return Series({
      method: 'GET',
      url: '/series'
    })
  }

  static findOne (id) {
    return Series({
      url: `/series/${id}`,
      method: 'GET'
    })
  }

  static create (payload) {
    return Series({
      url: '/series',
      method: 'POST',
      data: payload
    })
  }

  static update (id, payload) {
    return Series({
      url: `/series/${id}`,
      method: 'PUT',
      data: payload
    })
  }

  static delete (id) {
    return Series({
      url: `/series/${id}`,
      method: 'DELETE'
    })
  }
}