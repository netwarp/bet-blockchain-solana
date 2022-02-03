import Transaction from '../models/Transaction.mjs'
import { createClient } from 'redis';

const client = createClient();

client.on('error', (err) => console.log('Redis Client Error', err));

export async function play(data) {
    const address = data.address
    const signature = data.signature

    const transaction = await Transaction.build({
        address,
        signature
    })

    await transaction.save()

    await client.publish('signature', signature)

    console.log('signature sent to subscriber')
}

export async function toto() {
    return 'e'
}