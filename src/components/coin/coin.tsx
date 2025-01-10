import React from "react";
import { TableCell, TableRow } from "../ui/table";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { Line, LineChart, XAxis, YAxis } from "recharts";
import { coinMarketData } from "@/lib";

type CoinProps = {
  coin: {
    symbol: string;
    name: string;
    image: string;
    price_change_percentage_24h: number;
    current_price: number;
  };
};

const intl = new Intl.NumberFormat("en", {
  style: "currency",
  currency: "USD",
});

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
        <div className="flex gap-2">
          <img src={coin.image} width={24} height={24} />
          <p className="font-semibold text-base">
            {coin.name}{" "}
            <span className="font-medium text-[14px] text-slate-500 uppercase">
              {coin.symbol}
            </span>
          </p>
        </div>
      </TableCell>
      <TableCell>
        <p className="text-base">{intl.format(coin.current_price)}</p>
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
