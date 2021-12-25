import express from 'express'
import nunjucks from 'nunjucks'
const app = express()

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

app.listen(8080)