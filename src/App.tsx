import { Line, LineChart, XAxis, YAxis } from "recharts";
import "./App.css";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./components/ui/chart";
import { Table, TableBody, TableCell, TableRow } from "./components/ui/table";
import { Web3Auth, Web3AuthOptions } from "@web3auth/modal";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK } from "@web3auth/base";
import React from "react";
import { coinMarketData, coins } from "./lib";
import { BrowserProvider, ethers } from "ethers";

const clientId =
  "BOZKFX9qpRp_RoCX8e9XkMcbAnTl7et88nPyIQXCPJqvPZG01ZzdAddXUqiP-RvHAlBZsKfeQ42mZty81wHUa4Y";

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0xaa36a7",
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
  config: { chainConfig },
});

const web3AuthOptions: Web3AuthOptions = {
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider,
};
const web3auth = new Web3Auth(web3AuthOptions);

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

function App() {
  const [provider, setProvider] = React.useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [ethersProvider, setEthersProvider] = React.useState<
    BrowserProvider | undefined
  >();
  const [account, setAccount] = React.useState<any>();

  const intl = new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  });

  React.useEffect(() => {
    if (!provider) {
      setEthersProvider(undefined);
      return;
    }
    setEthersProvider(new ethers.BrowserProvider(provider));
  }, [provider]);

  React.useEffect(() => {
    const init = async () => {
      try {
        await web3auth.initModal();
        setProvider(web3auth.provider);

        if (web3auth.connected) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const login = async () => {
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
    if (web3auth.connected) {
      setLoggedIn(true);
    }
  };

  const logout = async () => {
    await web3auth.logout();
    setProvider(null);
    setLoggedIn(false);
  };

  const transaction = async () => {
    if (!ethersProvider) return;
    const signer = await ethersProvider.getSigner();

    const destination = "0x7aFac68875d2841dc16F1730Fba43974060b907A";
    const amount = ethers.parseEther("1.0"); // Convert 1 ether to wei

    // Submit transaction to the blockchain
    const tx = await signer.sendTransaction({
      to: destination,
      value: amount,
    });

    // Wait for the transaction to be mined
    const receipt = await tx.wait();
    console.log(receipt);
  };

  const getUserInfo = async () => {
    const user = await web3auth.getUserInfo();
    if (!ethersProvider) return;
    // For ethers v5
    // const signer = ethersProvider.getSigner();
    const signer = await ethersProvider.getSigner();

    // Get user's Ethereum public address
    const address = await signer.getAddress();
    console.log(address);

    // Get user's balance in ether
    // For ethers v5
    // const balance = ethers.utils.formatEther(
    // await ethersProvider.getBalance(address) // Balance is in wei
    // );
    const balance = ethers.formatEther(
      await ethersProvider.getBalance(address) // Balance is in wei
    );
    setAccount({
      user,
      address,
      balance,
    });
  };

  return (
    <>
      <h1>Hello!</h1>
      {!loggedIn && (
        <button onClick={login} className="card">
          Login
        </button>
      )}
      {loggedIn && (
        <>
          <div>
            <p>Balance: {account?.balance ?? 0}</p>
            <p>Wallet: {account?.address ?? "0xnull"}</p>
          </div>
          <div>
            <button className="card" onClick={getUserInfo}>
              Get user info
            </button>
            <button className="card" onClick={logout}>
              Logout
            </button>
            <button className="card" onClick={transaction}>
              Send monis
            </button>
          </div>
        </>
      )}
      <Table>
        <TableBody>
          {coins.map((c) => (
            <TableRow key={c.id}>
              <TableCell>
                <div className="flex gap-2">
                  <img src={c.image} width={32} height={32} />
                  <p className="font-semibold text-base">
                    {c.name}{" "}
                    <span className="font-medium text-[14px] text-slate-500 uppercase">
                      {c.symbol}
                    </span>
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <p className="text-base">{intl.format(c.current_price)}</p>
              </TableCell>
              <TableCell>
                <div className="grid justify-center">
                  <ChartContainer config={chartConfig} className="h-16">
                    <LineChart data={coinMarketData.prices}>
                      <YAxis
                        domain={["dataMin", "dataMax"]}
                        axisLine={false}
                        tickLine={false}
                        hide
                      />
                      <XAxis
                        dataKey="time"
                        tickLine={false}
                        axisLine={false}
                        hide
                      />
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                      />
                      <Line
                        dataKey="value"
                        type="linear"
                        stroke="var(--color-desktop)"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ChartContainer>
                  <span>{c.price_change_percentage_24h} %</span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default App;
