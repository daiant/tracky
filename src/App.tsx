import LoginScreen from "./components/login/login";
import { Tabs, TabsList, TabsTrigger } from "./components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import AllCoins, { StarredCoins } from "./components/coin/coins";
import { useDispatch, useSelector } from "react-redux";
import { Auth } from "./models/auth";
import Header from "./components/header/header";
import { useEffect, useState } from "react";
import { CoinStateProps } from "./models/coins";
import { store } from "./lib/store/store";
import { RotateCw } from "lucide-react";
import { Button } from "./components/ui/button";
import { toast } from "sonner";

function App() {
  const dispatch = useDispatch<typeof store.dispatch>();
  const [tabValue, setTabValue] = useState("coins");
  const hasUserInfo = useSelector<{ auth: Auth }>((state) =>
    Boolean(state.auth.user)
  );

  const coinData = useSelector<{ coins: CoinStateProps }, CoinStateProps>(
    (state) => state.coins
  );
  const theme = useSelector<{ theme: string }, string>((state) => state.theme);

  useEffect(() => {
    const date = new Date().getTime();
    if (coinData.validate > date) return;
    dispatch.coins.getCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.querySelector("body")!.classList.remove("light", "dark");
    document.querySelector("body")!.classList.add(theme);
  }, [theme]);

  const [loading, setLoading] = useState(false);
  if (!hasUserInfo) {
    return (
      <div className={theme}>
        <LoginScreen />
      </div>
    );
  }

  return (
    <div className={theme}>
      <Header />
      <Tabs value={tabValue} onValueChange={(e) => setTabValue(e)}>
        <TabsList>
          <TabsTrigger value="starred">Starred</TabsTrigger>
          <TabsTrigger value="coins">Coins</TabsTrigger>
        </TabsList>
        <TabsContent value="coins">
          <div className="w-full flex justify-end py-1">
            <Button
              title="reload"
              variant="ghost"
              onClick={() => {
                setLoading(true);
                dispatch.coins
                  .getCoins()
                  .catch(() => toast.warning("Could not fetch last data"))
                  .finally(() => setLoading(false));
              }}
              disabled={loading}
            >
              <RotateCw className={loading ? "animate-spin" : ""} />
            </Button>
          </div>
          <AllCoins />
        </TabsContent>
        <TabsContent value="starred">
          <StarredCoins navigateCoins={() => setTabValue("coins")} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default App;
