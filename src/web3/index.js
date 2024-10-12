// web3.js
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';

let web3;
let provider;

async function initWeb3() {
  provider = await detectEthereumProvider();
  if (provider) {
    web3 = new Web3(provider);
    await provider.request({ method: 'eth_requestAccounts' });
  } else {
    console.error("Please install MetaMask!");
  }
}

export { web3, initWeb3, provider };
