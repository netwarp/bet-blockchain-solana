import Transaction from '../models/Transaction.mjs'
import Reward from '../models/Reward.mjs'
import config from '../services/config.mjs'

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
    const transactions = await Transaction.count()
    const network = config.solana.network


    const limit = 30
    const page = request.body.page ?? 1

    const offset = page > 1 ? (page - 1) * limit : 0

    const rewards = await Reward.findAndCountAll({
        order: [
            ['id', 'desc']
        ],
        offset,
        limit
    })

    let pages = rewards.count / limit
    pages = Math.round(pages)


    const data = {
        transactions,
        rewards,
        network,
        page,
        pages
    }

    response.render('stats.html', data)
}

