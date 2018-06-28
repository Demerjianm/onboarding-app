import express from 'express'
import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost/testdb')

const app = express()

const graphql = require('./routes/graphql')

app.use('/api/graphql', graphql)

app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})

module.exports = app
