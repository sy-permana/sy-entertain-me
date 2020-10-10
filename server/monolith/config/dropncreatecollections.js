const db = require('./mongodb')

// * USE THIS ONLY IF COLLECTIONS 'movies' AND 'tvseries' ALREADY EXISTS
db.dropCollection('movies')
  .then(_ => {
    console.log(`dropped collection "movies"\ncreating collection "movies"`)
    return db.createCollection('movies', {
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
  })
  .then(_ => {
    console.log('successfully created collection "movies"')
    return db.dropCollection('tvseries')
  })
  .then(_ => {
    console.log(`dropped collection "tvseries"\ncreating collection "tvseries"`)
    return db.createCollection('tvseries', {
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
  })
  .then(_ => console.log('successfully created collection "tvseries"'))
  .catch(console.log)
