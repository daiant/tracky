import { createModel } from "@rematch/core";
import { RootModel } from ".";
import { coins as CoinData } from "@/lib";

export type CoinType = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  price_change_percentage_24h: number;
  current_price: number;
};
export type CoinStateProps = {
  starred: string[];
  coins: CoinType[];
};

export const coins = createModel<RootModel>()({
  state: {
    starred: [] as Array<string>,
    coins: CoinData,
  },
  reducers: {
    addStarred(state, payload: string) {
      if (state.starred.includes(payload)) return state;
      return {
        ...state,
        starred: state.starred.concat(payload),
      };
    },
    removeStarred(state, payload: string) {
      return {
        ...state,
        starred: state.starred.filter((coin) => coin !== payload),
      };
    },
  },
});
