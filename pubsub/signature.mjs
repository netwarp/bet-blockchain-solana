import { createClient } from 'redis'
import * as web3 from '@solana/web3.js'
import axios from 'axios'
import {getLatestNumberFromHash} from '../resources/js/utils.mjs'


(async () => {
    const client = createClient();

    client.on('error', (err) => console.log('Redis Client Error', err))

    await client.connect()

    const connection = new web3.Connection(
        web3.clusterApiUrl('devnet')
    )

    client.subscribe('signature',async (signature) => {

        console.log(`waiting for signature: ${signature}`)

        const subscription_id = connection.onSignature(signature, async (signatureResult, context) => {
            console.log(`signature received`)
            console.log(signatureResult)
            console.log(console.log(context))
            const slot = context.slot
            // await connection.removeSignatureListener(subscription_id)


            const url = 'https://api.devnet.solana.com'
            const response = await axios.post(url, {
                "jsonrpc":"2.0",
                "id":1,
                "method":"getTransaction",
                "params":
                    [signature]
            })
            const data = await response.data
            const recent_block_hash = data.result.transaction.message.recentBlockhash // TODO put in many lines
            console.log('recent block hash:')
            console.log(recent_block_hash)

            console.log(getLatestNumberFromHash(signature))
            console.log(getLatestNumberFromHash(recent_block_hash))

            if (getLatestNumberFromHash(signature) === getLatestNumberFromHash(recent_block_hash)  ) {
                console.log('win')
            }
            else {
                console.log('lost')
            }


        })
    })
})();