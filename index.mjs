import express from 'express'
import body_parser from 'body-parser'
import nunjucks from 'nunjucks'
import toml from 'toml'
import fs from 'fs'
import session from 'express-session'

import router from './routes/routes.mjs'

const file = fs.readFileSync('config.toml', 'utf8')
export const config = toml.parse(file)

const app = express()

import { createServer } from "http";
import { Server } from "socket.io";
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });


import * as Events from "./events/Events.mjs";

io.on('connection', (socket) => {
    console.log('connected')

    socket.on('play', (data) => Events.play(data))
})

app.use(body_parser.json())

import * as web3 from '@solana/web3.js'

nunjucks.configure('views', {
    autoescape: true,
    express: app,
    watch: true
});

app.use(session({
    secret: 'test',
    resave: 'false',
    saveUninitialized: true,
    cookie: { secure: true }
}))
app.use(express.static('public'))
app.use(router)
app.get('*', (request, response) => response.redirect('/'))

const connection = new web3.Connection(
    web3.clusterApiUrl('devnet')
)

connection.onAccountChange(new web3.PublicKey(config.solana.wallet), (accountInfo, context) => {
    console.log(accountInfo)
    console.log(context)
})



httpServer.listen(8080);