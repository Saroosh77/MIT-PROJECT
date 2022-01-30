import express from 'express'
import './db/mongoose'

import newsRouter from './routers/news.router'
import eventRouter from './routers/event.router'
import roomsRouter from './routers/room.router'
import userRouter from './routers/user.router'
import authRouter from './routers/auth.router'
import appointmentRouter from './routers/appointment.router'
import internationalRouter from './routers/international.router'

const port = process.env.PORT || 3000
const hostname = process.env.HOST || "localhost"

const app = express()
app.use(express.json())

app.use("/api/", newsRouter)
app.use("/api/", eventRouter)
app.use("/api/", roomsRouter)
app.use("/api/", userRouter)
app.use("/api/", authRouter)
app.use("/api/", appointmentRouter)
app.use("/api/", internationalRouter)

app.get('/', async (request: express.Request, response: express.Response) => {
    response.send('Welcome to MIT-THD Project GET Call')
})

app.post('/', async (request: express.Request, response: express.Response) => {
    response.send('Welcome to MIT-THD Project POST Call')
})

app.listen(port, () => {
    console.log(`Server listening at http://${hostname}:${port}`)
})