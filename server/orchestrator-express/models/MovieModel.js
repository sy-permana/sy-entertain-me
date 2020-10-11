const { Movies } = require('../config/axios')

module.exports = class Movie {
  // todo -> findAll findOne create update delete
  static findAll () {
    return Movies({
      method: 'GET',
      url: '/movies'
    })
  }

  static findOne (id) {
    return Movies({
      url: `/movies/${id}`,
      method: 'GET'
    })
  }

  static create (payload) {
    return Movies({
      url: '/movies',
      method: 'POST',
      data: payload
    })
  }

  static update (id, payload) {
    console.log(id)
    return Movies({
      url: `/movies/${id}`,
      method: 'PUT',
      data: payload
    })
  }

  static delete (id) {
    return Movies({
      url: `/movies/${id}`,
      method: 'DELETE'
    })
  }
}