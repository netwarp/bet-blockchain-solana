import * as web3 from '@solana/web3.js'
import Transaction from '../models/Transaction.mjs'
import io from '../index.mjs'
import SolanaAPI from '../core/SolanaAPI.mjs'

import {getLatestNumberFromHash} from '../resources/js/utils.mjs'

const connection = new web3.Connection(
    web3.clusterApiUrl('devnet') // TODO .env
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

        const solana_api = new SolanaAPI('https://api.devnet.solana.com') // todo .env
        let data = await solana_api.getTransaction(signature)

        const recent_block_hash = data.result.transaction.message.recentBlockhash // TODO put in many lines
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