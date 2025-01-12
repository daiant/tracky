import { createModel } from "@rematch/core";
import { RootModel } from ".";
import { fetchCoinHistoricalData, fetchCoins } from "@/lib/coingecko";

export type CoinType = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  price_change_percentage_24h: number;
  price_change_percentage_30d_in_currency: number;
  current_price: number;
};
export type CoinStateProps = {
  starred: string[];
  coins: CoinType[];
  coins_chart_data: { [key in string]: [number, number][] };
  validate: number;
};

export const coins = createModel<RootModel>()({
  state: {
    starred: [],
    validate: 0,
    coins: [],
    coins_chart_data: {},
  } as CoinStateProps,
  effects: (dispatch) => ({
    async getCoins() {
      const data = await fetchCoins();
      dispatch.coins.addCoins(data);
      const charts = await fetchCoinHistoricalData(data.map((c) => c.id));
      dispatch.coins.addCoinChartData(charts);
    },
  }),
  reducers: {
    addCoinChartData(
      state,
      payload: { id: string; data: [number, number][] }[]
    ) {
      const chart_data = {} as CoinStateProps["coins_chart_data"];
      payload.forEach((data) => {
        chart_data[data.id] = data.data;
      });
      return {
        ...state,
        coins_chart_data: chart_data,
      };
    },
    addCoins(state, payload: CoinType[]) {
      return {
        ...state,
        coins: payload,
        validate: new Date().setHours(new Date().getHours() + 1),
      };
    },
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
