<script>
    import {is_connected, network, wallet} from '../_store'

    import ConnectWallet from '../components/Connect-Wallet'

    let plays = []

    import { io } from "socket.io-client"
    const socket = io()

    import * as web3 from '@solana/web3.js'
    const connection = new web3.Connection(
        web3.clusterApiUrl($network)
    )

    async function play() {
        const transaction = new web3.Transaction().add(
            web3.SystemProgram.transfer({
                fromPubkey: window.solana.publicKey,
                toPubkey: $wallet,
                lamports: 1000000,
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

	socket.on('slot', (data) => {
		const play = plays.find(element => element.signature === data.signature)
        const slot = data.slot

        play.slot = slot
        plays = plays
    })

    socket.on('block_hash', (data) => {
	    const play = plays.find(element => element.signature === data.signature)
        const block_hash = data.block_hash

	    play.block_hash = block_hash
	    plays = plays
    })

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

<div class="app-page">
    {#if $is_connected === false}
        <ConnectWallet text="Connect your wallet to play" central="true"/>
    {:else }
        <div class="container-play">
            <div class="play-line">
                <button class="button-play" on:click={play}>Play</button>
                <div class="ad"></div>
            </div>
            <table class="result-line">
                <thead>
                    <tr>
                        <th>Results</th>
                        <th>Signature</th>
                        <th>Slot</th>
                        <th>BlockHash</th>
                    </tr>
                </thead>
                <tbody>
                    {#if plays.length === 0}
                        <tr>
                            <td colspan="4">No result</td>
                        </tr>
                    {/if}
                    {#each plays as play}
                        <tr>
                            <td>
                                {#if play.status === 'loading'}
                                    <img src="/images/icon-load.svg" alt="" class="loader">
                                {:else if play.status === 'won' }
                                    <img src="/images/icon-won.svg" alt="">
                                {:else if play.status === 'lost' }
                                    <img src="/images/icon-lost.svg" alt="">
                                {/if}
                            </td>
                            <td>
                                <a href="https://explorer.solana.com/tx/{play.signature}?cluster={$network}" target="_blank">
                                    {play.signature}
                                </a>
                            </td>
                            <td>
                                {#if play.slot}
                                    <a href="https://explorer.solana.com/block/{play.slot}?cluster={$network}" target="_blank">
                                        {play.slot}
                                    </a>
                                {/if}
                            </td>
                            <td>
                                {#if play.block_hash}
                                    <a href="https://explorer.solana.com/block/{play.block_hash}?cluster={$network}" target="_blank">
                                        {play.block_hash}
                                    </a>
                                {/if}
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    {/if}
</div>