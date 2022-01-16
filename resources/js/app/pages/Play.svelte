<script>
    import config from '../_store'
    import axios from 'axios'

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

        await sendSignatureToServer(window.solana.publicKey.toString(), signature)

        const result = await connection.confirmTransaction(signature)

        console.log(result)
    }

    async function sendSignatureToServer(address, signature) {
        const url = '/api/play'
        const object = {
            address,
            signature
        }
        const response = await axios.post(url, object)
        const data = await response.data

        if (data.success) {
            alert('success')
        }
    }
</script>

<div id="view-play">
    <button type="button" on:click={play}>Bet</button>
</div>