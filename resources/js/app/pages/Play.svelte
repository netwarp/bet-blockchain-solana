<script>
    import config from '../_store'
    import axios from 'axios'

    let plays = []

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

        plays = [{
            status: 'loading',
            signature
        }, ...plays]

        console.log('current plays')
        console.log(plays)
    }

    socket.on('response', (data) => {
        const play = plays.find(element => element.signature === data.signature)
        const status = data.status

        play.status = status

        plays = plays

        console.log(data)
        console.log(play)
        console.log(status)
    })
</script>

<div id="view-play">

    <button type="button" on:click={play}>Play</button>

    <div class="box-result">
        <div class="box-result-header">
            Results:
        </div>
        <div class="box-result-lines">
            {#each plays as play}
                <div class="box-result-line">
                    <div class="box-result-lite-status">
                        {#if play.status === 'loading'}
                            <img src="/images/icon-load.svg" alt="" class="loader">
                        {:else if play.status === 'won' }
                            <img src="/images/icon-won.svg" alt="">
                        {:else if play.status === 'lost' }
                            <img src="/images/icon-lost.svg" alt="">
                        {/if}
                    </div>
                    <div class="box-result-lite-signature">
                        <a href="https://explorer.solana.com/tx/{play.signature}?cluster=devnet" target="_blank">
                            {play.signature}
                        </a>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>