import {
  AccountAbstractionProvider,
  SafeSmartAccount,
} from "@web3auth/account-abstraction-provider";
import { CHAIN_NAMESPACES, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3AuthOptions, Web3Auth } from "@web3auth/modal";

export function useWeb3Auth() {
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

  const accountAbstractionProvider = new AccountAbstractionProvider({
    config: {
      chainConfig,
      bundlerConfig: {
        url: `https://api.pimlico.io/v2/${chainId}/rpc?apikey=${process.env.REQUEST_MONIS}`,
      },
      smartAccountInit: new SafeSmartAccount(),
      paymasterConfig: {
        url: `https://api.pimlico.io/v2/${chainId}/rpc?apikey=${process.env.REQUEST_MONIS}`,
      },
    },
  });

  const privateKeyProvider = new EthereumPrivateKeyProvider({
    config: { chainConfig },
  });

  const web3AuthOptions: Web3AuthOptions = {
    clientId,
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
    privateKeyProvider,
    // Use the account abstraction provider we configured earlier
    // accountAbstractionProvider,
    // This will allow you to use EthereumPrivateKeyProvider for
    // external wallets, while use the AccountAbstractionProvider
    // for Web3Auth embedded wallets.
    // useAAWithExternalWallet: false,
  };
  return new Web3Auth(web3AuthOptions);
}
