import express from 'express'
import nunjucks from 'nunjucks'
const app = express()

import * as web3 from '@solana/web3.js'


nunjucks.configure('views', {
    autoescape: true,
    express: app,
    watch: true
});

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.render('index.html');
});

app.get('/rules', (request, response) => response.render('rules'))



const connection = new web3.Connection(
    web3.clusterApiUrl('devnet')
)

connection.onAccountChange(new web3.PublicKey('4pAJV74b9QgGtF58GPwWefzqoBVuViiyNo26URWTFeEk'), (accountInfo, context) => {
    console.log(accountInfo)
    console.log(context)
})


app.listen(8080)