<script>
    import {onMount} from 'svelte'
    import axios from 'axios'

    const address = window.solana.publicKey.toString()

    let transactions = []

    onMount(async () => {
        const url = '/api/history'
        const response = await axios.post(url, {
            address
        })
        const data = response.data
        transactions = data
    })


</script>

<div id="view-history">
    <h1>History:</h1>
    <table>
        <thead>
            <tr>
                <th>Signature</th>
            </tr>
        </thead>
        <tbody>
        {#each transactions as transaction}
            <tr>
                <td>{transaction.signature}</td>
            </tr>
        {/each}
        </tbody>
    </table>
</div>