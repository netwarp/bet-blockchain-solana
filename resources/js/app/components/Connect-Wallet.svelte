<script>
	import {is_connected, public_key} from "../_store";

	const getProvider = async () => {
		if ("solana" in window) {
			const provider = window.solana
			if (provider.isPhantom) {
				return provider
			}
		}
		window.open("https://phantom.app/", "_blank")
	}

	async function connectWallet() {
		const provider = await getProvider()
		const response = await provider.connect()
		const response_public_key = response.publicKey.toString()
		public_key.set(response_public_key)
		$is_connected = true
	}

    export let central = false
    export let text
</script>

<div class="wallet-connector {central ? 'central' : ''}">
    <div on:click={connectWallet}>
        {text}
    </div>
</div>