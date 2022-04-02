import * as web3 from '@solana/web3.js'
import config from '../services/config.mjs'
import Transaction from '../models/Transaction.mjs'
import io from '../index.mjs'
import SolanaAPI from '../core/SolanaAPI.mjs'

import { createClient } from 'redis'
const client = createClient()
client.on('error', (err) => console.log('Redis Client Error', err))
await client.connect()

import {getLatestNumberFromHash} from '../resources/js/utils.mjs'

const connection = new web3.Connection(
    web3.clusterApiUrl(config.solana.network)
)


export async function play(data) {
    const address = data.address
    const signature = data.signature

    const transaction = await Transaction.build({
        address,
        signature
    })

    await transaction.save()

    const subscription_id = connection.onSignature(signature, async (signatureResult, context) => {
        console.log(`signature received`)
        console.log(signatureResult)
        console.log(console.log(context))

        const solana_api = new SolanaAPI(config.solana.api_url)
        let data = await solana_api.getTransaction(signature)

        let recent_block_hash = data
        recent_block_hash = recent_block_hash.result
        recent_block_hash = recent_block_hash.transaction
        recent_block_hash = recent_block_hash.message
        recent_block_hash = recentBlockhash.recentBlockhash

        console.log('recent block hash:')
        console.log(recent_block_hash)

        console.log(getLatestNumberFromHash(signature))
        console.log(getLatestNumberFromHash(recent_block_hash))

        if (getLatestNumberFromHash(signature) === getLatestNumberFromHash(recent_block_hash)  ) {
            console.log('WON')
            await Transaction.update(
                {status: 'won'},
                {where: {
                    signature
                }}
            )
            io.emit('response', {
                signature,
                status: 'won'
            })

            const reward_address = data.result.transaction.message.accountKeys[0]
            await client.publish('rewards', reward_address)
        }
        else {
            console.log('LOST')
            await Transaction.update(
                {status: 'lost'},
                {where: {
                    signature
                }}
            )
            io.emit('response', {
                signature,
                status: 'lost'
            })
        }
    })
}