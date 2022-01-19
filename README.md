# nft-opensea-sniper-bot

## Installation
```
git clone https://github.com/zmok-io/nft-opensea-sniper-bot.git
cd ./nft-opensea-sniper-bot
npm i
```
## Usage
To run this script:  `node main.js --<ARGS>`

### ARGS - Arguments
- **openSeaAssetUrl**: The link of the OpenSea asset you want to buy.
- **providerUrl**: Ethereum RPC endpoint, the fastest one is https://zmok.io, you can get there also endpoint enhanced with Front-running for even faster sniping. More info: https://docs.zmok.io/#/?id=front-running.
- **extraGas** (optional): Amount in GWei that will be added to the current gas price for the transaction ( txn_gas_price = current_gas_price + extra_gas_price). Default is 0.
- **startTimeUTC**: The UTC time at which the asset should be bought ( format hh:mm:ss). Default is immediate buy.

### Evironment variables
- **WALLET_ADDRESS**: The taker Ethereum address linked with private key.
- **WALLET_PRIVATE_KEY**: The taker private key.
- **NETWORK**: Network to use. Only two options ("rinkeby" for Ethereum Testnet, "mainnet" for Ethereum Mainnet).
- **OPENSEA_API_KEY**: Here you can request for free OpenSea API key: https://docs.opensea.io/reference/request-an-api-key.

Sample .env file:
```
WALLET_ADDRESS="0x6Be02d1d3665660d22FF9624b7BE0551ee1Ac91b"
WALLET_PRIVATE_KEY="93b3c12287537e38c90a9219d4cb074a89a16e9cdb20bf85728ebd97c343e342"
NETWORK="mainnet"
OPENSEA_API_KEY="4521ae54f2ee43cda853f75978d78bb0"
```

### Sample usage
```
node main.js --providerUrl="https://api.zmok.io/mainnet/627zzh0pyyopztwz" --openSeaAssetUrl="https://opensea.io/assets/0x495f947276749ce646f68ac8c248420045cb7b5e/71041490345621065721195847833942703721093249884990947978303498361262923841537"
```
