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
    //  console.log(provider)

      if ( ! provider) {
          console.log('no provider')
          return
      }

      await provider.connect()

      const connection = new web3.Connection(
          web3.clusterApiUrl('devnet')
      )

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