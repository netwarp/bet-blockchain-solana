import axios from 'axios'

export async function won(signature) {

}

export async function lost(signature) {
    const o = {
        signature,
        status: 'lost'
    }
    await axios.post('http://localhost:8080/api/play/response')
    console.log('sent ')
}