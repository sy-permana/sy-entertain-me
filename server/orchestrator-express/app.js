const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const routers = require('./routers')
const errorHandler = require('./middlewares/errorHandler')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/',routers)
app.use(errorHandler)

app.listen(PORT, _ => console.log(`EntertainMe server on port: ${PORT}`))