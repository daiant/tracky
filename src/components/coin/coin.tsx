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

type CoinProps = {
  coin: {
    symbol: string;
    name: string;
    image: string;
    price_change_percentage_24h: number;
    current_price: number;
  };
};

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

function Coin({ coin }: CoinProps) {
  return (
    <TableRow>
      <TableCell>
        <div className="flex gap-2 items-center">
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
