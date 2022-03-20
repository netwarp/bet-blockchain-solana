<script>
    import {onMount} from 'svelte'
    import axios from 'axios'
    import {is_connected, public_key} from '../_store'

    import ConnectWallet from '../components/Connect-Wallet'

    let transactions = []
    let pages = 1

    onMount(async () => {
        if ( ! $is_connected) {
            return
        }

        const url = '/api/history'
        const response = await axios.post(url, {
            address: $public_key
        })
        const data = response.data
        console.log(data)

        transactions = data.transactions.rows
        pages = data.pages
    })

    async function loadHistoryPage(number) {
        console.log(number)
    }
</script>

<div class="app-page">
    <h1>History:</h1>

    {#if $is_connected === false}
        <ConnectWallet text="Connect your wallet to see your history" central="true"/>
    {:else }
        <table>
            <thead>
            <tr>
                <th>Status</th>
                <th>Signature</th>
            </tr>
            </thead>
            <tbody>
                {#each transactions as transaction}
                    <tr>
                        <td>{transaction.status}</td>
                        <td>{transaction.signature}</td>
                    </tr>
                {/each}
            </tbody>
        </table>

        <div class="pagination">
            {#each Array(pages) as _, i}
                <!--
                <button class="link" on:click={loadHistoryPage(333) }>{i + 1}</button>
                 -->
            {/each}
        </div>
    {/if}
</div>