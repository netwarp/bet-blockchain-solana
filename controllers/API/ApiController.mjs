import Transaction from '../../models/Transaction.mjs'

export async function index(request, response) {

    response.json('API v1')
}

// TODO remove
export async function response(request, response) {
    response.sendStatus(200)
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