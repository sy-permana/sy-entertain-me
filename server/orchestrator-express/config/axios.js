const axios = require('axios')

const Movies = axios.create({
  // * localhost:5001 for Movie's service
  baseURL: 'http://localhost:5001'
})

const Series = axios.create({
  // * localhost:5002 for TvSeries's service
  baseURL: 'http://localhost:5002'
})

module.exports = { Movies, Series }