import Transaction from '../models/Transaction.mjs'

export async function index(request, response) {
    response.render('index.html')
}

export async function play(request, response) {
    response.render('play.html')
}

export async function rules(request, response) {
    response.render('rules.html')
}

export async function stats(request, response) {
    response.render('stats.html')
}

