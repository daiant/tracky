import { TableCell, TableRow } from "../ui/table";
import { ChartConfig, ChartContainer } from "../ui/chart";
import { Line, LineChart, XAxis, YAxis } from "recharts";
import { formatNumber } from "@/lib/utils";
import { Button } from "../ui/button";
import { Star } from "lucide-react";
import { CoinType } from "@/models/coins";
import { Badge } from "../ui/badge";

type CoinProps = {
  starred?: boolean;
  onCoinStarred: () => void;
  coin: CoinType;
  coinMarketData?: [number, number][];
};

function Coin({ coin, onCoinStarred, starred, coinMarketData }: CoinProps) {
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color:
        Math.sign(coin.price_change_percentage_30d_in_currency) < 0
          ? "hsl(var(--chart-1))"
          : "rgb(22 163 74 / var(--tw-bg-opacity, 1))",
    },
  } satisfies ChartConfig;
  const parsedData = coinMarketData?.map(([time, value]) => ({
    time,
    value,
  }));
  return (
    <TableRow className="group">
      <TableCell>
        <div className="flex gap-2 items-center">
          <Button
            onClick={onCoinStarred}
            variant="ghost"
            className={`${
              starred ? "opacity-100" : "opacity-0"
            } group-hover:opacity-100 transition-all px-2`}
          >
            <Star
              fill={starred ? "#fec63b" : "transparent"}
              stroke={starred ? "#fec63b" : "currentColor"}
            />
          </Button>
          <img src={coin.image} className="size-[28px] aspect-square" />
          <div>
            <span className="font-medium text-[14px] text-slate-500 uppercase">
              {coin.symbol}
            </span>
            <p className="font-semibold">{coin.name}</p>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <p className="text-base">{formatNumber(coin.current_price)}</p>
      </TableCell>
      <TableCell>
        <div className="grid justify-center">
          <ChartContainer config={chartConfig} className="h-8">
            <LineChart data={parsedData}>
              <YAxis
                domain={["dataMin", "dataMax"]}
                axisLine={false}
                tickLine={false}
                hide
              />
              <XAxis dataKey="time" tickLine={false} axisLine={false} hide />
              <Line
                dataKey="value"
                type="linear"
                stroke="var(--color-desktop)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
          <Badge
            variant={
              Math.sign(coin.price_change_percentage_30d_in_currency) > 0
                ? "positive"
                : "destructive"
            }
          >
            {Math.abs(coin.price_change_percentage_30d_in_currency).toPrecision(
              5
            )}{" "}
            %
          </Badge>
        </div>
      </TableCell>
    </TableRow>
  );
}

export default Coin;
