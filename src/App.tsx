import "./App.css";
import LoginScreen from "./components/login/login";
import { Tabs, TabsList, TabsTrigger } from "./components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import AllCoins, { StarredCoins } from "./components/coin/coins";
import { useSelector } from "react-redux";
import { Auth } from "./models/auth";
import Header from "./components/header/header";
import { useState } from "react";

function App() {
  const [tabValue, setTabValue] = useState("coins");
  const hasUserInfo = useSelector<{ auth: Auth }>((state) =>
    Boolean(state.auth.user)
  );

  if (!hasUserInfo) {
    return <LoginScreen />;
  }

  return (
    <>
      <Header />
      <Tabs value={tabValue} onValueChange={(e) => setTabValue(e)}>
        <TabsList>
          <TabsTrigger value="starred">Starred</TabsTrigger>
          <TabsTrigger value="coins">Coins</TabsTrigger>
        </TabsList>
        <TabsContent value="coins">
          <AllCoins />
        </TabsContent>
        <TabsContent value="starred">
          <StarredCoins navigateCoins={() => setTabValue("coins")} />
        </TabsContent>
      </Tabs>
    </>
  );
}

export default App;
