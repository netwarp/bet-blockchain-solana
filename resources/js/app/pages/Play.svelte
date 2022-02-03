<script>
    import config from '../_store'
    import axios from 'axios'

    import { io } from "socket.io-client";
    const socket = io();

    import * as web3 from '@solana/web3.js'

    const connection = new web3.Connection(
        web3.clusterApiUrl(config.solana.network)
    )

    async function play() {
        const transaction = new web3.Transaction().add(
            web3.SystemProgram.transfer({
                fromPubkey: window.solana.publicKey,
                toPubkey: config.solana.wallet,
                lamports: 20000,
            })
        )
        transaction.recentBlockhash =  (await connection.getRecentBlockhash()).blockhash
        transaction.feePayer = window.solana.publicKey


        const {signature}  = await window.solana.signAndSendTransaction(transaction)
        console.log(signature)

        // Socket
        socket.emit('play', {
            address: window.solana.publicKey.toString(),
            signature,
        })
    }
</script>

<div id="view-play">
    <button type="button" on:click={play}>Bet</button>
</div>