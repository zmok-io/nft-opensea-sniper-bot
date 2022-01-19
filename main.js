require('dotenv').config();

const BigNumber = require('bignumber.js');
const opensea = require("opensea-js");
var { OrderSide } = require('opensea-js/lib/types');
const OpenSeaPort = opensea.OpenSeaPort;
const Network = opensea.Network;
const HDWalletProvider = require("@truffle/hdwallet-provider");
const args = require('yargs').argv;

const openSeaAssetUrl = args.openSeaAssetUrl; //"https://opensea.io/assets/0x495f947276749ce646f68ac8c248420045cb7b5e/71041490345621065721195847833942703721093249884990947978303498361262923841537"// args.url
const providerUrl = args.providerUrl; // "https://api.zmok.io/mainnet/637zzh0pyyopztwz"
var extraGas = args.extraGas; // add extra gas to current gas price
var startTimeUTC = args.startTimeUTC;

const walletAddress = process.env.WALLET_ADDRESS;
const walletPrivateKey = process.env.WALLET_PRIVATE_KEY;
const network = process.env.NETWORK || "mainnet";
const openSeaApiKey =  process.env.OPENSEA_API_KEY; // API key is required

function parseOpenSeaUrl(url) {
  var pp = url.replace(/^.*0x/, "0x");
  var p1 = pp.replace(/\/.*/, "");
  var p2 = pp.replace(/.*\//, "");
  return [p1, p2];
}

console.log("walletAddress: " + walletAddress)
console.log("network: " + network)
console.log("openSeaAssetUrl: " + openSeaAssetUrl)
console.log("providerUrl: " + providerUrl)

if (!walletAddress || !walletPrivateKey || !openSeaApiKey) {
  console.error("Missing .env variables!");
  return;
}

if (!openSeaAssetUrl || !providerUrl) {
  console.error("Missing required arguments!");
  return;
}

if (!args.extraGas) {
  extraGas = 0
}

if (!args.startTimeUTC) {
  [hour, minute, second] = [0, 0, 0]
} else {
  hour = parseInt(args.startTimeUTC.replace(/:.*/, ""))
  re = /:(\d+):/
  minute = parseInt((re.exec(args.startTimeUTC))[1]);
  second = parseInt(args.startTimeUTC.replace(/.*:/, ""));
}

const providerEngine = new HDWalletProvider(walletPrivateKey, providerUrl)

const seaport = new OpenSeaPort(
  providerEngine, {
    networkName: (network == "mainnet" ? Network.Main : Network.Rinkeby),
    apiKey: openSeaApiKey,
  },
  (arg) => console.log(arg)
);

seaport.gasPriceAddition = new BigNumber(extraGas);
var [assetContractAddress, tokenId] = parseOpenSeaUrl(openSeaAssetUrl) // extract asset contract address and token id from the opensea likn
console.log("assetContractAddress: " + assetContractAddress)
console.log("tokenId: " + tokenId)

// If the order is a sell order (order.side === OrderSide.Sell), the taker is the buyer and this will prompt
// the buyer to pay for the item(s) but send them to the recipientAddress.
// If the order is a buy order ( OrderSide.Buy), the taker is the seller but the bid amount be sent to the recipientAddress.
async function main() {
  console.log("Start...");
  const order = await seaport.api.getOrder({ // extracting order to fulfill
    asset_contract_address: assetContractAddress,
    token_id: tokenId,
    side: OrderSide.Sell
  });

  const transactionHash = await seaport.fulfillOrder({ //Fulfilling order
    order,
    accountAddress: walletAddress,
  });
  console.log("transactionHash: " + transactionHash);
  console.log("Finish...");
  return;
};

// Setting up a launch timeout
var now = new Date()
var t = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, second, 10).getTime()
currentTime = new Date().getTime()
timeo = t - Date.now();
setTimeout(main, Math.max(timeo, 0))
