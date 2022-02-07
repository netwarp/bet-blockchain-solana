import {writable} from 'svelte/store'
export const view = writable('play')
export const is_connected = writable(false)
export const public_key = writable(null)

import config from '../../../config.json'
export default config
