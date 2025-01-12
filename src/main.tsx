import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { PersistGate } from "redux-persist/integration/react";
import { getPersistor } from "@rematch/persist";
import { store } from "./lib/store/store.ts";
import { Provider } from "react-redux";
import { Web3AuthProvider } from "@web3auth/modal-react-hooks";
import web3AuthContextConfig from "./lib/w3a/context.ts";

const peristor = getPersistor();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={peristor}>
        <Web3AuthProvider config={web3AuthContextConfig}>
          <App />
        </Web3AuthProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
