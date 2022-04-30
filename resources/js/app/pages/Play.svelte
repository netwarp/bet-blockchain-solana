<script>
    import {
		is_connected,
        network,
        wallet,
        socket,
        online
	} from '../_store'

    import {
		Connection,
	    clusterApiUrl,
	    SystemProgram,
	    PublicKey,
        Transaction
	} from "@solana/web3.js"

    import ConnectWallet from '../components/Connect-Wallet'

    let plays = []

    const connection = new Connection(
        clusterApiUrl($network)
    )

    async function play() {

        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: window.solana.publicKey,
                toPubkey: new PublicKey($wallet),
                lamports: 1000000,
            })
        )

        transaction.recentBlockhash =  (await connection.getRecentBlockhash()).blockhash
        transaction.feePayer = window.solana.publicKey
        const {signature}  = await window.solana.signAndSendTransaction(transaction)
        console.log(signature)

        // Socket
        $socket.emit('play', {
            address: window.solana.publicKey.toString(),
            signature,
        })

        plays = [{
            status: 'loading',
            signature,
        }, ...plays]

        console.log('current plays')
        console.log(plays)
    }


    $socket.on('response', (data) => {
		console.log(data)
        const play = plays.find(element => element.signature === data.signature)

        play.status = data.status
        play.slot = data.slot
        play.slot_leader = data.slot_leader
        play.number = data.number.toString()

        plays = plays

        console.log(data)
        console.log(play)
    })

</script>

<div class="app-page">
    {#if $is_connected === false}
        <ConnectWallet text="Connect your wallet to play" central="true"/>
        <div id="disclaimer">
            This is a gamble game. By playing you confirm you are adult and crypto is allowed in your legislation.
        </div>
    {:else }
        <div class="container-play">
            <div class="play-line">
                <button class="button-play" on:click={play}>Play</button>
                <div class="connected-count">
                    <div class="bubble"></div>
                    <span>{$online} user{$online > 1 ? 's' : ''} online</span>
                </div>
            </div>
            <table class="result-line">
                <thead>
                    <tr>
                        <th>Results</th>
                        <th>Signature</th>
                        <th>Slot</th>
                        <th>Slot leader</th>
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
                                    {#each play.signature as char}
                                        <i class:mark={play.number === char}>{char}</i>
                                    {/each}
                                </a>
                            </td>
                            <td>
                                <a href="https://explorer.solana.com/block/{play.slot}?cluster={$network}" target="_blank">
                                    {#if play.slot}
                                        {#each play.slot as char}
                                            <i class:mark={play.number === char}>{char}</i>
                                        {/each}
                                    {/if}
                                </a>
                            </td>
                            <td>
                                <a href="https://explorer.solana.com/tx/{play.signature}?cluster={$network}" target="_blank">
                                    {#if play.slot_leader}
                                        {#each play.slot_leader as char}
                                            <i class:mark={play.number === char}>{char}</i>
                                        {/each}
                                    {/if}
                                </a>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    {/if}
</div>