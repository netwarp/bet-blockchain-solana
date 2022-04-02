import * as web3 from '@solana/web3.js'
import base58 from 'bs58'
import config from '../services/config.mjs'
import Reward from '../models/Reward.mjs'

import {percent} from '../core/utils.mjs'

console.log('Start microservice reward')

const keypair = web3.Keypair.fromSecretKey(
    base58.decode(config.solana.private_key)
)

const connection = new web3.Connection(
    web3.clusterApiUrl(config.solana.network)
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

    const transaction = new web3.Transaction()
        .add(web3.SystemProgram.transfer({
            fromPubkey: keypair.publicKey,
            toPubkey: address,
            lamports: percent(balance, 90),
        }))
        .add(web3.SystemProgram.transfer({
            fromPubkey: keypair.publicKey,
            toPubkey: config.solana.custom,
            lamports: percent(balance, 6),
        }))

    transaction.feePayer = keypair.publicKey
    transaction.recentBlockhash =  (await connection.getRecentBlockhash()).blockhash
    const signature = await sendAndConfirmTransaction(connection, transaction, [keypair])
    console.log(transaction)
    console.log(signature)

    await Reward.create({ address, signature})
    console.log('success reward')

    // reward the owner
})