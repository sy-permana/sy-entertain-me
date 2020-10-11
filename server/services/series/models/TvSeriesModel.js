const { Double, ObjectId } = require('mongodb')
const db = require('../config/mongodb')

const TvSeries = db.collection('tvseries')

class TvSeriesModel {
  static find() {
    return TvSeries.find().toArray()
  }

  static findOne(id) {
    return TvSeries.findOne({ _id: ObjectId(id) })
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
    return TvSeries.insertOne(data)
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
    return TvSeries.updateOne({ _id: ObjectId(id) }, updateDoc, options)
  }

  static delete(id) {
    return TvSeries.deleteOne({ _id: ObjectId(id) })
  }
}

module.exports = TvSeriesModel
