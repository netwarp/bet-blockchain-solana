<script>
    import {view, is_connected, public_key} from './_store'

    import Play from './pages/Play'
    import History from './pages/History'

   // let is_connected = false
    //let public_key = ''

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

    function disconnect() {
        window.solana.disconnect()
        $is_connected = false
    }


</script>

<div class="container">
    <div class="sidebar">
        {#if $is_connected === false}
            <div class="connect-wallet" on:click={connectWallet}>Connect wallet</div>
        {:else }
            <div class="connect-wallet key">{$public_key}</div>
        {/if}
        <div class="sidebar-item {$view === 'play' ? 'active' : '' }" on:click={ () => $view = 'play' }>Play</div>
        <div class="sidebar-item {$view === 'rewards' ? 'active' : '' }" on:click={ () => $view = 'rewards' }>Rewards</div>
        <div class="sidebar-item {$view === 'history' ? 'active' : '' }" on:click={ () => $view = 'history' }>History</div>
        <div class="sidebar-item" on:click={disconnect}>Logout</div>
    </div>
    <div class="main">
        {#if $view === 'play'}
            <Play />
        {:else if $view === 'rewards'}
            Rewards
        {:else if $view === 'history'}
            <History />
        {/if}
    </div>
</div>