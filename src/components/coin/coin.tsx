import { TableCell, TableRow } from "../ui/table";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { Line, LineChart, XAxis, YAxis } from "recharts";
import { coinMarketData } from "@/lib";
import { formatNumber } from "@/lib/utils";
import { Button } from "../ui/button";
import { Star } from "lucide-react";
import { CoinType } from "@/models/coins";

type CoinProps = {
  starred?: boolean;
  onCoinStarred: () => void;
  coin: CoinType;
};

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

function Coin({ coin, onCoinStarred, starred }: CoinProps) {
  return (
    <TableRow className="group">
      <TableCell>
        <div className="flex gap-2 items-center">
          <Button
            onClick={onCoinStarred}
            variant="ghost"
            className={`${
              starred ? "opacity-100" : "opacity-0"
            } group-hover:opacity-100 transition-all`}
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
            <LineChart data={coinMarketData.prices}>
              <YAxis
                domain={["dataMin", "dataMax"]}
                axisLine={false}
                tickLine={false}
                hide
              />
              <XAxis dataKey="time" tickLine={false} axisLine={false} hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey="value"
                type="linear"
                stroke="var(--color-desktop)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
          <span>{coin.price_change_percentage_24h} %</span>
        </div>
      </TableCell>
    </TableRow>
  );
}

export default Coin;
