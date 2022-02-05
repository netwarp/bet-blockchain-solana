import { createClient } from 'redis'
import * as web3 from '@solana/web3.js'
import axios from 'axios'
import {won, lost} from './_utils.mjs'

import SolanaAPI from '../core/SolanaAPI.mjs'
import {getLatestNumberFromHash} from '../resources/js/utils.mjs'


const connection = new web3.Connection(
    web3.clusterApiUrl('devnet')
)

const client = await createClient();
await client.connect()
client.on('error', (err) => console.log('Redis Client Error', err))


import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:8080"
    }
});

io.sockets.emit('lost', "eee")

await client.subscribe('signature',async (signature) => {

    console.log(`waiting for signature: ${signature}`)

    const subscription_id = connection.onSignature(signature, async (signatureResult, context) => {
        console.log(`signature received`)
        console.log(signatureResult)
        console.log(console.log(context))
        const slot = context.slot
        // await connection.removeSignatureListener(subscription_id)

        const solana_api = new SolanaAPI('https://api.devnet.solana.com') // todo .env
        let data = await solana_api.getTransaction(signature)


        const recent_block_hash = data.result.transaction.message.recentBlockhash // TODO put in many lines
        console.log('recent block hash:')
        console.log(recent_block_hash)

        console.log(getLatestNumberFromHash(signature))
        console.log(getLatestNumberFromHash(recent_block_hash))

        if (getLatestNumberFromHash(signature) === getLatestNumberFromHash(recent_block_hash)  ) {
            await won(signature)
        }
        else {
            console.log('LOST')
            await lost(signature)
        }
    })
})


