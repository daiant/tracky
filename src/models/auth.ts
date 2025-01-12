import { createModel } from "@rematch/core";
import { AuthUserInfo } from "@web3auth/auth";
import { RootModel } from ".";

const baseState = {
  user: null as Partial<AuthUserInfo> | null,
  balance: "",
  address: "",
};

export type Auth = {
  user: Partial<AuthUserInfo> | null;
  balance: string;
  address: string;
};

export const auth = createModel<RootModel>()({
  state: baseState,
  reducers: {
    logout() {
      return baseState;
    },
    setUserInfo(state, payload: Partial<AuthUserInfo> | null) {
      return {
        ...state,
        user: payload,
      };
    },
    setBalance(state, payload: string) {
      return {
        ...state,
        balance: payload,
      };
    },
    setAddress(state, payload: string) {
      return {
        ...state,
        address: payload,
      };
    },
  },
});
