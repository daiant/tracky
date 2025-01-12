import { Table, TableBody } from "../ui/table";
import Coin from "./coin";
import { useDispatch, useSelector } from "react-redux";
import { CoinStateProps, CoinType } from "@/models/coins";
import { store } from "@/lib/store/store";
import { StarOff } from "lucide-react";
import { Button } from "../ui/button";

function CoinList({ coins }: { coins: Array<CoinType> }) {
  const dispatch = useDispatch<typeof store.dispatch>();
  const coinData = useSelector<{ coins: CoinStateProps }, CoinStateProps>(
    (state) => state.coins
  );
  console.log(coinData);
  return (
    <Table>
      <TableBody>
        {coins.map((c) => (
          <Coin
            coin={c}
            key={c.id}
            onCoinStarred={() => {
              if (coinData.starred.includes(c.symbol)) {
                dispatch.coins.removeStarred(c.symbol);
              } else {
                dispatch.coins.addStarred(c.symbol);
              }
            }}
            starred={coinData.starred.includes(c.symbol)}
            coinMarketData={coinData.coins_chart_data[c.id]}
          />
        ))}
      </TableBody>
    </Table>
  );
}

export default function AllCoins() {
  const coinData = useSelector<{ coins: CoinStateProps }, CoinStateProps>(
    (state) => state.coins
  );

  return <CoinList coins={coinData.coins} />;
}

export function StarredCoins({ navigateCoins }: { navigateCoins: () => void }) {
  const coinData = useSelector<{ coins: CoinStateProps }, CoinStateProps>(
    (state) => state.coins
  );
  const starred = coinData.coins.filter((c) =>
    coinData.starred.includes(c.symbol)
  );
  if (!starred.length)
    return (
      <div className="grid items-center justify-items-center gap-4 py-12">
        <StarOff className="size-[64px]" stroke="#ccc" />
        <p className="text-sm italic text-slate-400">No coins saved.</p>
        <Button onClick={navigateCoins}>Explore coins</Button>
      </div>
    );

  return <CoinList coins={starred} />;
}
