import {
    Keypair,
    Connection,
    clusterApiUrl,
    sendAndConfirmTransaction,
    Transaction,
    PublicKey,
    SystemProgram,
} from "@solana/web3.js";


import base58 from 'bs58'
import config from '../services/config.mjs'
import Reward from '../models/Reward.mjs'

import {percent} from '../core/utils.mjs'

console.log('Start microservice reward')


const keypair = Keypair.fromSecretKey(
    base58.decode(config.solana.private_key)
)

const connection = new Connection(
    clusterApiUrl(config.solana.network)
)

console.log(keypair.publicKey.toString())

import SolanaAPI from '../core/SolanaAPI.mjs'
import { createClient } from 'redis'

const client = createClient()
client.on('error', (err) => console.log('Redis Client Error', err))
await client.connect()

await client.subscribe('rewards', async (address) => {
    try {
        console.log(`new winner: ${address}`)
        const api_url = config.solana.api_url
        const wallet = config.solana.wallet

        const solana_api = new SolanaAPI(api_url)

        let balance = await solana_api.getBalance(wallet)
        balance = balance.result.value


        const transaction = new Transaction()
            .add(SystemProgram.transfer({
                fromPubkey: keypair.publicKey,
                toPubkey: new PublicKey(address),
                lamports: percent(balance, 30),
            }))
            .add(SystemProgram.transfer({
                fromPubkey: keypair.publicKey,
                toPubkey: new PublicKey(config.solana.custom),
                lamports: percent(balance, 8),
            }))


        transaction.feePayer = keypair.publicKey
        transaction.recentBlockhash =  (await connection.getRecentBlockhash()).blockhash
        const signature = await sendAndConfirmTransaction(connection, transaction, [keypair])
        //console.log(transaction)
        await Reward.create({ address, signature})
    //    console.log(address)
      //  console.log(signature)
        console.log('success reward')
        console.log('-------')

    } catch (error) {
        console.log(error)
    }
})