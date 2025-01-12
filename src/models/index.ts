import { Models } from "@rematch/core";
import { auth } from "./auth";
import { coins } from "./coins";

export interface RootModel extends Models<RootModel> {
  auth: typeof auth;
  coins: typeof coins;
}

export const models: RootModel = { auth, coins };
