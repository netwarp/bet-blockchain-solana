import express from 'express'
import body_parser from 'body-parser'
import nunjucks from 'nunjucks'

import session from 'express-session'

import router from './routes/routes.mjs'

const app = express()

import { createServer } from "http";
import { Server } from "socket.io";
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

import * as Events from "./events/Events.mjs"

io.on('connection', (socket) => {
    console.log('connected')

    socket.on('play', (data) => Events.play(data))
})

app.use(body_parser.json())

nunjucks.configure('views', {
    autoescape: true,
    express: app,
    watch: true
})

app.use(session({
    secret: 'test',
    resave: 'false',
    saveUninitialized: true,
    cookie: { secure: true }
}))

app.use(express.static('public'))
app.use(router)
app.get('*', (request, response) => response.redirect('/'))

httpServer.listen(8080)

export default io