<script>
    import {onMount} from 'svelte'
    import axios from 'axios'
    import {is_connected, public_key, network} from '../_store'

    import ConnectWallet from '../components/Connect-Wallet'

    let transactions = []
    let page = 1
    let pages = 1

    async function loadHistoryPage(number) {
	    page = number

	    const url = '/api/history'
	    const response = await axios.post(url, {
		    address: $public_key,
            page: number
	    })
	    const data = response.data
	    console.log(data)

	    transactions = data.transactions.rows
	    page = data.page
	    pages = data.pages
    }

    onMount(async () => {
        if ( ! $is_connected) {
            return
        }

		console.log('mounted')

	    await loadHistoryPage(1)
    })
</script>

<div class="app-page">
    {#if $is_connected === false}
        <ConnectWallet text="Connect your wallet to see your history" central="true"/>
        <div id="disclaimer">
            This is a gamble game. By playing you confirm you are adult and crypto is allowed in your legislation.
        </div>
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
                        <td>
                            {#if transaction.status === 'loading'}
                                <img src="/images/icon-load.svg" alt="" class="loader">
                            {:else if transaction.status === 'won' }
                                <img src="/images/icon-won.svg" alt="">
                            {:else if transaction.status === 'lost' }
                                <img src="/images/icon-lost.svg" alt="">
                            {/if}
                        </td>
                        <td>
                            <a href="https://explorer.solana.com/tx/{transaction.signature}?cluster={$network}" target="_blank">
                                {transaction.signature}
                            </a>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>

        <div class="pagination">
            {#each Array(pages) as _, i}
                <button class="link { i + 1 == page ? 'active' : '' }" on:click={ () => loadHistoryPage(i + 1) }>{i + 1}</button>
            {/each}
        </div>
    {/if}
</div>