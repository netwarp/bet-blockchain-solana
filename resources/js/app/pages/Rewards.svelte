<script>
	import {onMount} from 'svelte'
	import axios from 'axios'
	import {is_connected, public_key} from '../_store'
    import config from '../_store'

	import ConnectWallet from '../components/Connect-Wallet'

	let transactions = []
	let page = 1
	let pages = 1

	async function loadHistoryPage(number) {
		page = number

		const url = '/api/rewards'
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
        <ConnectWallet text="Connect your wallet to see your rewards" central="true"/>
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
                        <img src="/images/icon-won.svg" alt="icon won">
                    </td>
                    <td>
                        <a href="https://explorer.solana.com/tx/{transaction.signature}?cluster={config.solana.network}" target="_blank">
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