module.exports = errorHandler = (err, req, res, next) => {
  res.status(err.response.status).json({ errors: err.response.data.errors })
}