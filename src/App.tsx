import "./App.css";
import LoginScreen from "./components/login/login";
import { Tabs, TabsList, TabsTrigger } from "./components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import Coins from "./components/coin/coins";
import { useSelector } from "react-redux";
import { Auth } from "./models/auth";
import Header from "./components/header/header";

function App() {
  const hasUserInfo = useSelector<{ auth: Auth }>((state) =>
    Boolean(state.auth.user)
  );

  if (!hasUserInfo) {
    return <LoginScreen />;
  }

  return (
    <>
      <Header />
      <Tabs defaultValue="coins">
        <TabsList>
          <TabsTrigger value="coins">Coins</TabsTrigger>
        </TabsList>
        <TabsContent value="coins">
          <Coins />
        </TabsContent>
      </Tabs>
    </>
  );
}

export default App;
