import "./App.css";
import { Table, TableBody } from "./components/ui/table";
import { IProvider } from "@web3auth/base";
import React from "react";
import { coins } from "./lib";
import { BrowserProvider, ethers } from "ethers";
import Coin from "./components/coin/coin";
import { useWeb3Auth } from "./hooks/use-web3auth";
import LoginScreen from "./components/login/login";
import Header from "./components/header/header";
import { Tabs, TabsList, TabsTrigger } from "./components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import Coins from "./components/coin/coins";
function App() {
  const web3auth = useWeb3Auth();

  const [provider, setProvider] = React.useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [ethersProvider, setEthersProvider] = React.useState<
    BrowserProvider | undefined
  >();
  const [account, setAccount] = React.useState<
    | {
        user: any;
        address: any;
        balance: any;
      }
    | undefined
  >();

  React.useEffect(() => {
    if (!provider) {
      setEthersProvider(undefined);
      return;
    }
    setEthersProvider(new ethers.BrowserProvider(provider));
  }, [provider]);

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

  const login = async () => {
    await init();
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
    if (web3auth.connected) {
      setLoggedIn(true);
    }
  };

  const logout = async () => {
    await init();
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
    await init();
    const user = await web3auth.getUserInfo();
    if (!ethersProvider) return;
    // For ethers v5
    // const signer = ethersProvider.getSigner();
    const signer = await ethersProvider.getSigner();

    // Get user's Ethereum public address
    const address = await signer.getAddress();

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
      {!loggedIn && <LoginScreen onLogin={login} />}

      {loggedIn && (
        <>
          <Header account={account} />
          <Tabs defaultValue="coins">
            <TabsList>
              <TabsTrigger value="coins">Coins</TabsTrigger>
            </TabsList>
            <TabsContent value="coins">
              <Coins />
            </TabsContent>
          </Tabs>
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
    </>
  );
}

export default App;
