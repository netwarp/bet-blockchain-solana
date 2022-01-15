import Connector from './connector/Connector'
import App from './app/App'

export const connector = new Connector({
    target: document.querySelector('#wallet-connector')
})

export const app = new App({
    target: document.querySelector('#app')
})

/*
import * as web3 from '@solana/web3.js'
console.log(web3)
const getProvider = async () => {
    if ("solana" in window) {
        const provider = window.solana;
        if (provider.isPhantom) {
            return provider;
        }
    }
    window.open("https://phantom.app/", "_blank");
};

window.addEventListener('load', async () => {

    const provider = await getProvider()

    if ( ! provider.isConnected) {

        const wallet_preview = document.querySelector('#wallet-preview')

        const template = `<button id="wallet-connect-button" class="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">Connect wallet</button>`


        wallet_preview.innerHTML = template

        const wallet_connect_button = document.querySelector('#wallet-connect-button')

        wallet_connect_button.addEventListener('click', async () => {
            const response = await provider.connect()

            const public_key = response.publicKey.toString()
            console.log(public_key)

            const template = `<div id="wallet-address"><a href="/app">${public_key}</a></div>`

            wallet_preview.innerHTML = template
        })
    } else {
      //  const template =

    }


})


window.addEventListener('load', async () => {
    const provider = await getProvider()
    console.log(provider.isConnected)
    /*
    window.solana.disconnect();
    window.solana.on('disconnect', () => console.log("disconnected!"))


    const nav_action = document.querySelector('#nav-action')
    nav_action.addEventListener('click', async () => {


        if ( ! provider) {
            console.log('no provider')
            return
        }

        await provider.connect()

        provider.on('connect', () => console.log('c1'))

        window.solana.on("connect", () => console.log("c2"))


        const connection = new web3.Connection(
            web3.clusterApiUrl('devnet')
        )
    })


    const receiver = new web3.PublicKey('4pAJV74b9QgGtF58GPwWefzqoBVuViiyNo26URWTFeEk')

    const transaction = new web3.Transaction().add(
        web3.SystemProgram.transfer({
            fromPubkey: provider.publicKey,
            toPubkey: receiver,
            lamports: 100,
        })
    )

    transaction.recentBlockhash =  (await connection.getRecentBlockhash()).blockhash

    transaction.feePayer = provider.publicKey

    const {signature}  = await window.solana.signAndSendTransaction(transaction)
    const result = await connection.confirmTransaction(signature)
})
*/