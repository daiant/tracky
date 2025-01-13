import { TableCell, TableRow } from "../ui/table";
import { ChartConfig, ChartContainer } from "../ui/chart";
import { Line, LineChart, XAxis, YAxis } from "recharts";
import { cn, formatNumber } from "@/lib/utils";
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
          <Button onClick={onCoinStarred} variant="link" className="group p-0">
            <Star
              fill={starred ? "#fec63b" : "transparent"}
              stroke={starred ? "#fec63b" : "currentColor"}
              className={cn(
                starred ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                "transition-all"
              )}
            />
          </Button>
          <img src={coin.image} className={"size-[28px] aspect-square"} />
          <div>
            <span className="font-medium text-[14px] text-slate-500 uppercase">
              {coin.symbol}
            </span>
            <p className="font-semibold">{coin.name}</p>
          </div>
        </div>
      </TableCell>
      <TableCell>
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
      </TableCell>
      <TableCell>
        <div className="grid justify-items-end">
          <p className="text-base font-medium text-slate-700">
            {formatNumber(coin.current_price)}
          </p>
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
