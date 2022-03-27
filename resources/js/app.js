import App from './app/App.svelte'
import navbar from './common/navbar'
navbar()

export const app = document.querySelector('#app') ? new App({target: document.querySelector('#app')}) : null

