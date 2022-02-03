import axios from 'axios'

class SolanaAPI {

    constructor(url) {
        this.url = url
    }

    /**
     *
     * @param signature
     * @return {Promise<void>}
     */
    async getTransaction(signature) {
        const object = {
            jsonrpc: '2.0',
            id: 1,
            method: 'getTransaction',
            params: [
                signature
            ]
        }

        const response = await axios.post(this.url, object)
        return await response.data
    }

    /**
     *
     * @param address
     * @return {Promise<any>}
     */
    async getBalance(address) {
        const object = {
            jsonrpc:'2.0',
            id: 1,
            method:'getBalance',
            params: [
                address
            ]
        }
        const response = await axios.post(this.url, object)
        return await response.data
    }
}

export default SolanaAPI