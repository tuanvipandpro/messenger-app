import express from "express"
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import routes from './routes'
import swaggerConfig from './swagger.json'
import {serve, setup} from 'swagger-ui-express'

import { socketConfig } from './socket'

import authMiddleware from './src/middleware/auth'

const app = express()
dotenv.config()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.static('docs'))
app.use('/api-docs', serve, setup(swaggerConfig, {explorer: true}))
app.use(authMiddleware.verifyJwtToken)

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('Connect DB successfully !!!'))
  .catch(e => {
    console.error('Cannot connect DB !!!', e)
    process.exit(1)
  })

routes(app)

socketConfig(app.listen(port, () => {
  console.log(`Server start at : ${port}`)
}))
