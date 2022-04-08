import Transaction from '../../models/Transaction.mjs'
import Reward from '../../models/Reward.mjs'
import config from '../../services/config.mjs'

export async function index(request, response) {
    const ip = request.ip
    response.json(ip)
}

export async function cfg(request, response) {
    const network = config.solana.network
    const wallet = config.solana.wallet

    response.json({
        network,
        wallet
    })
}

export async function history(request, response) {
    const address = request.body.address

    if ( ! address) {
        return response.sendStatus(404)
    }

    const limit = 30
    const page = request.body.page ?? 1

    const offset = page > 1 ? (page - 1) * limit : 0

    const transactions = await Transaction.findAndCountAll({
        where: {
            address
        },
        order: [
            ['id', 'desc']
        ],
        offset,
        limit
    })

    let pages = transactions.count / limit
    pages = Math.round(pages)

    const data = {
        transactions,
        page,
        pages
    }

    response.json(data)
}

export async function rewards(request, response) {
    const address = request.body.address

    if ( ! address) {
        return response.sendStatus(404)
    }

    const limit = 30
    const page = request.body.page ?? 1

    const offset = page > 1 ? (page - 1) * limit : 0

    const transactions = await Reward.findAndCountAll({
        where: {
            address
        },
        order: [
            ['id', 'desc']
        ],
        offset,
        limit
    })

    let pages = transactions.count / limit
    pages = Math.round(pages)

    const data = {
        transactions,
        page,
        pages
    }

    response.json(data)
}