// TODO Refactor later


import Transaction from '../../models/Transaction.mjs'



export async function index(request, response) {
    response.json('API v1')
}

export async function play(request, response) {
    const address = request.body.address
    const signature = request.body.signature


    const transaction = await Transaction.build({
        address,
        signature
    })

    await transaction.save()

    response.json({success: true})
}
