import { CoinType } from "@/models/coins";

const headers = () => {
  const headers = new Headers();
  headers.set("accept", "application/json");
  headers.set("x-cg-demo-api-key", "CG-FTaHvJh9BkhGz1Mobsep5k2x");
  return headers;
};
export const fetchCoins = async (): Promise<CoinType[]> => {
  return await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2Cethereum%2Ctether%2C%20ripple%2Cbinancecoin%2Csolana&price_change_percentage=1h",
    { headers: headers() }
  ).then((d) => d.json());
};

export const fetchCoinHistoricalData = async (
  ids: string[]
): Promise<{ id: string; data: [number, number][] }[]> => {
  return await Promise.all(
    ids.map(async (id) => {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30&interval=daily`,
        { headers: headers() }
      ).then((d) => d.json());
      console.log(id, data);
      return { id, data: data?.prices ?? [] };
    })
  );
};
