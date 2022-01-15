<script>
    let is_connected = false
    let public_key = ''

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
        public_key = response_public_key
        is_connected = true
    }
</script>

<div>
    {#if is_connected}
        <div>
            <a href="/app">{public_key}</a>
            <ul>
                <li>Disconnect</li>
            </ul>
        </div>
    {:else}
        <button on:click={connectWallet} id="wallet-connect-button">Connect wallet</button>
    {/if}
</div>