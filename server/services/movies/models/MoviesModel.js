const { Double, ObjectId } = require('mongodb')
const db = require('../config/mongodb')

const Movies = db.collection('movies')

class Movie {
  static find() {
    return Movies.find().toArray()
  }

  static findOne(id) {
    return Movies.findOne({ _id: ObjectId(id) })
  }

  static insertOne(
    data = {
      title: '',
      overview: '',
      poster_path: '',
      popularity: Double,
      tags: []
    }
  ) {
    return Movies.insertOne(data)
  }

  static updateOne(
    id,
    payload = {
      title: '',
      overview: '',
      poster_path: '',
      popularity: Double,
      tags: []
    }
  ) {
    const { title, overview, poster_path, popularity, tags } = payload
    const options = { upsert: false }
    const updateDoc = {
      $set: {
        title,
        overview,
        poster_path,
        popularity,
        tags
      }
    }
    return Movies.updateOne({ _id: ObjectId(id) }, updateDoc, options)
  }

  static delete(id) {
    return Movies.deleteOne({ _id: ObjectId(id) })
  }
}
module.exports = Movie
