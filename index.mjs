import express from 'express'
import nunjucks from 'nunjucks'
import toml from 'toml'
import fs from 'fs'
import session from 'express-session'
import redis from 'redis'
import connectRedis from 'connect-redis'
const RedisStore = connectRedis(session)
const redisClient = redis.createClient({
    host: 'localhost',
    port: 6379
})

import router from './routes/routes.mjs'

const file = fs.readFileSync('config.toml', 'utf8')
export const config = toml.parse(file)

const app = express()

import * as web3 from '@solana/web3.js'

nunjucks.configure('views', {
    autoescape: true,
    express: app,
    watch: true
});

app.use(session({
    store: new RedisStore({ client: redisClient }),
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

app.listen(8080)