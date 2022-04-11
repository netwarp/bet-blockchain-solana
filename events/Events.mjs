import * as web3 from '@solana/web3.js'
import config from '../services/config.mjs'
import Transaction from '../models/Transaction.mjs'
import io from '../index.mjs'
import SolanaAPI from '../core/SolanaAPI.mjs'

import { createClient } from 'redis'
const client = createClient()
client.on('error', (err) => console.log('Redis Client Error', err))
await client.connect()

import {getLatestNumberFromHash} from '../core/utils.mjs'

const connection = new web3.Connection(
    web3.clusterApiUrl(config.solana.network)
)

/**
 *
 * @param {Object} data
 * @return {Promise<void>}
 */
export async function play(data) {
    const address = data.address
    const signature = data.signature

    const transaction = await Transaction.build({
        address,
        signature
    })

    await transaction.save()

    const subscription_id = connection.onSignature(signature, async (signatureResult, context) => {

        try {
            console.log(`signature received: ${signature}`)
            console.log(signatureResult)
            console.log(context)

            const slot = context.slot

            io.emit('slot', {
                slot,
                signature
            })

            const block = await connection.getBlock(slot)
            const block_hash = block.blockhash

            if (block_hash === undefined) {
                console.log('Error, so LOST')
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

                return
            }

            io.emit('block_hash', {
                block_hash,
                signature
            })

            if (getLatestNumberFromHash(signature) === getLatestNumberFromHash(block_hash) ) {
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

                await client.publish('rewards', address)
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
        } catch (error) {
            console.log('OH SHIT')
            console.log(error)

            console.log('Error, so LOST')
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