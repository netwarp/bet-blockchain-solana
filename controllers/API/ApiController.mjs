import io from '../../index.mjs'

export async function index(request, response) {

    response.json('API v1')
}

export async function response(request, response) {
    console.log(request.body)
    io.emit('hello')
    response.sendStatus(200)
}

