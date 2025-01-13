import { store } from "@/lib/store/store";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import Text from "../ui/text";
import { useWeb3Auth } from "@web3auth/modal-react-hooks";
import { getBalance, getAddress } from "@/lib/ethers";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import React from "react";
import Scroller from "../scroller/scroller";

const { dispatch } = store;
export default function LoginScreen() {
  const { connect, userInfo, provider } = useWeb3Auth();

  const login = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await connect();
    dispatch.auth.setUserInfo(userInfo);

    if (provider) {
      dispatch.auth.setBalance(await getBalance(provider));
      dispatch.auth.setAddress(await getAddress(provider));
    }

    // HACK: Idk why user info is visible only after second click
    setTimeout(() => (e.target as HTMLButtonElement)?.click(), 100);
  };

  return (
    <div>
      <LoginForm onLogin={login} />
      <Scroller />
    </div>
  );
}

function LoginForm({
  onLogin,
}: {
  onLogin: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void> | void;
}) {
  const theme = useSelector<{ theme: string }, string>((state) => state.theme);
  return (
    <div
      className="fixed inset-0 bg-gradient-to-t from-background from-35% to-transparent z-10 grid justify-center items-center"
      id="login"
    >
      <Card className="bg-popover/50 backdrop-blur-[2px] border-muted">
        <CardHeader className="flex justify-center items-center">
          <img
            src={"/logo.svg"}
            className={cn("size-8", theme === "dark" ? "invert" : "")}
          />
          <Text variant="h1">Tracky</Text>
          <div className="border-t-[1px] border-slate-100">
            <Text variant="h2">Demo purposes only</Text>
          </div>
        </CardHeader>
        <CardContent>
          <Button onClick={onLogin} className="text-base">
            Connect your wallet
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
