import { io } from "socket.io-client"
import {writable, readable} from 'svelte/store'
export const view = writable('play')
export const is_connected = writable(false)
export const public_key = writable(null)
export const network = writable('')
export const wallet = writable('')
export const online = writable(0)

export const socket = readable(io())



import axios from 'axios'
const url = '/api/cfg'
axios.get(url).then(response => {
	const data = response.data
	network.set(data.network)
	wallet.set(data.wallet)
})