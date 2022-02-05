<script>
    import {view} from './_store'
    import Play from './pages/Play'
    import History from './pages/History'
</script>

<div class="app">
    <div class="nav">
        <div class="link {$view === 'play' ? 'active' : '' }" on:click={ () => $view = 'play' }>Play</div>
        <div class="link {$view === 'history' ? 'active' : '' }" on:click={ () => $view = 'history' }>History</div>
    </div>

    <div class="view">
        {#if $view === 'play'}
            <Play />
        {:else if $view === 'history'}
            <History />
        {/if}
    </div>
</div>