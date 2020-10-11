module.exports = errorHandler = (err, req, res, next) => {
  let statusCode = 500
  let errors = []

  switch(err.name) {
    case 'FORM_ERROR':
      statusCode = 400
      err.errors.forEach(error => errors.push(error))
      break
    case 'NOT_FOUND':
      statusCode = 404
      errors.push('requested item is not found')
      break
    case 'MongoError':
      statusCode = 400
      errors.push('error due to required field is empty')
      break
    case 'Error':
      statusCode = 400
      errors.push(err.message)
      break
    default:
      console.log(err.name)
      console.log(err.message)
      errors.push('internal server error')
  }

  res.status(statusCode).json({ errors })
}