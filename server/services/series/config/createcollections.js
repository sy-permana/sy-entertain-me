const db = require('./mongodb')

// * USE THIS IF COLLECTIONS 'movies' AND 'tvseries' NOT EXISTS
console.log(`creating collection "tvseries"`)
db.createCollection('tvseries', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['title', 'overview', 'poster_path', 'popularity', 'tags'],
      properties: {
        title: {
          bsonType: 'string',
          description: 'title must be a string and required'
        },
        overview: {
          bsonType: 'string',
          description: 'overview must be a string and required'
        },
        poster_path: {
          bsonType: 'string',
          description: 'poster is required'
        },
        popularity: {
          bsonType: ['double'],
          description: 'must be a double'
        },
        tags: {
          bsonType: 'array',
          description: 'invalid data type of tags, must be an array!'
        }
      }
    }
  }
})
  .then(_ => console.log('successfully created collection "tvseries"'))
  .catch(console.log)
