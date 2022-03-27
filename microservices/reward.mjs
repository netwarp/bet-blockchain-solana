import * as web3 from '@solana/web3.js'
import base58 from 'bs58'
import config from '../services/config.mjs'

import {percent} from '../core/utils.mjs'

console.log('Start microservice reward')

const keypair = web3.Keypair.fromSecretKey(
    base58.decode(config.solana.private_key)
)

const connection = new web3.Connection(
    web3.clusterApiUrl('devnet')
)

console.log(keypair.publicKey.toString())

import SolanaAPI from '../core/SolanaAPI.mjs'
import { createClient } from 'redis'
import {sendAndConfirmTransaction} from '@solana/web3.js'

const client = createClient()
client.on('error', (err) => console.log('Redis Client Error', err))
await client.connect()

await client.subscribe('rewards', async (address) => {
    const api_url = config.solana.api_url
    const wallet = config.solana.wallet

    const solana_api = new SolanaAPI(api_url)

    let balance = await solana_api.getBalance(wallet)
    balance = balance.result.value

    const lamports = percent(balance, 90)

    const transaction = new web3.Transaction().add(
        web3.SystemProgram.transfer({
            fromPubkey: keypair.publicKey,
            //toPubkey: keypair.publicKey,
            toPubkey: address,
            lamports,
        })
    )

    transaction.feePayer = keypair.publicKey
    transaction.recentBlockhash =  (await connection.getRecentBlockhash()).blockhash

    const tx = await sendAndConfirmTransaction(connection, transaction, [keypair])
    console.log(transaction)
    console.log(tx)

    console.log('success reward')
})