<script>
    import {view} from './_store'

</script>

<div class="app">
    <div class="nav">
        <div class="link {$view === 'play' ? 'active' : '' }" on:click={ () => $view = 'play' }>Play</div>
        <div class="link {$view === 'orders' ? 'active' : '' }" on:click={ () => $view = 'orders' }>Orders</div>
        <div class="link {$view === 'history' ? 'active' : '' }" on:click={ () => $view = 'history' }>History</div>
    </div>

    <div class="view">
        {#if $view === 'play'}
            Play
        {:else if $view === 'orders'}
            Orders
        {:else if $view === 'history'}
            History
        {/if}
    </div>
</div>