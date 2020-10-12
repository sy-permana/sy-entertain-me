module.exports = errorHandler = (err, req, res, next) => {
  if (err.hasOwnProperty('response')) {
    res.status(err.response.status).json({ errors: err.response.data.errors })
  } else {
    console.log(err.name)
    console.log(err.message)
    res.status(500).json({ errors: [ 'internal server error' ] })
  }
}