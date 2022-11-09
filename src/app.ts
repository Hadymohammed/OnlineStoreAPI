import express, { json, Request, Response,Application } from 'express'
import bodyParser from 'body-parser'
import router from './routers'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'

const app: Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())

app.use(
    cors(),
    json(),
    helmet(),
    morgan('dev'),
)

app.use("/", router)


app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

export default app