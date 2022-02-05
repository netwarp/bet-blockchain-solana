import io from '../../index.mjs'

export async function index(request, response) {

    response.json('API v1')
}

// TODO remove
export async function response(request, response) {
    response.sendStatus(200)
}

