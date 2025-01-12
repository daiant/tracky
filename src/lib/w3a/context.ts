import { CHAIN_NAMESPACES, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3AuthOptions } from "@web3auth/modal";

const clientId =
  "BOZKFX9qpRp_RoCX8e9XkMcbAnTl7et88nPyIQXCPJqvPZG01ZzdAddXUqiP-RvHAlBZsKfeQ42mZty81wHUa4Y";
const chainId = "0xaa36a7";

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: chainId,
  rpcTarget: "https://rpc.ankr.com/eth_sepolia",
  // Avoid using public rpcTarget in production.
  // Use services like Infura, Quicknode etc
  displayName: "Ethereum Sepolia Testnet",
  blockExplorerUrl: "https://sepolia.etherscan.io",
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: {
    chainConfig,
  },
});

const web3AuthOptions: Web3AuthOptions = {
  chainConfig,
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider,
};

const web3AuthContextConfig = {
  web3AuthOptions,
  adapters: [],
};

export default web3AuthContextConfig;
