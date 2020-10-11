const { Double, ObjectId } = require('mongodb')
const db = require('../config/mongodb')

const Movies = db.collection('movies')

class Movie {
  static find() {
    console.log('request: fetch all Movies')
    return Movies.find().toArray()
  }

  static findOne(id) {
    console.log('request: fetch one Movie')
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
    console.log('request: create new Movie')
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
    console.log('request: update Movie')
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
    console.log('request: delete Movie')
    return Movies.deleteOne({ _id: ObjectId(id) })
  }
}
module.exports = Movie
