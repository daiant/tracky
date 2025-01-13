import { Models } from "@rematch/core";
import { auth } from "./auth";
import { coins } from "./coins";
import { theme } from "./theme";

export interface RootModel extends Models<RootModel> {
  auth: typeof auth;
  coins: typeof coins;
  theme: typeof theme;
}

export const models: RootModel = { auth, coins, theme };
