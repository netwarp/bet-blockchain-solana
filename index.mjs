import express from 'express'
import nunjucks from 'nunjucks'
import toml from 'toml'
import fs from 'fs'
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

app.use(express.static('public'));
app.use(router)

const connection = new web3.Connection(
    web3.clusterApiUrl('devnet')
)

connection.onAccountChange(new web3.PublicKey('4pAJV74b9QgGtF58GPwWefzqoBVuViiyNo26URWTFeEk'), (accountInfo, context) => {
    console.log(accountInfo)
    console.log(context)
})

app.listen(8080)