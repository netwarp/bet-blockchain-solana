import * as web3 from '@solana/web3.js'
import config from '../services/config.mjs'
import Transaction from '../models/Transaction.mjs'
import io from '../index.mjs'
import SolanaAPI from '../core/SolanaAPI.mjs'

import { createClient } from 'redis'
const client = createClient()
client.on('error', (err) => console.log('Redis Client Error', err))
await client.connect()

import {bet} from '../core/utils.mjs'

const connection = new web3.Connection(
    web3.clusterApiUrl(config.solana.network)
)

/**
 *
 * @param {Object} data
 * @return {Promise<void>}
 */
export async function play(data) {
    try {
        //console.log('new play')
        // console.log(data)

        const address = data.address
        const signature = data.signature

        const transaction = await Transaction.build({
            address,
            signature
        })

        // await transaction.save()

        const slot = (await connection.getSlot()).toString()
        const slot_leader = await connection.getSlotLeader()

        const status = bet(signature, slot, slot_leader)

        if ( ! status) {
            console.log('LOST')
            await Transaction.update(
                {status: 'lost'},
                {where: {
                        signature
                    }}
            )

            io.emit('response', {
                signature,
                status: 'lost',
                slot,
                slot_leader,
                number: status
            })

            return
        }

        console.log('WON')
        await Transaction.update(
            {status: 'won'},
            {where: {
                    signature
                }}
        )
        io.emit('response', {
            signature,
            status: 'won',
            slot,
            slot_leader,
            number: status
        })
    } catch (error) {
        console.log(error)
    }
}