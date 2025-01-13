import React from "react";
import { CoinList } from "../coin/coins";
import { MOCK_LOGIN_DATA } from "./test-data";

export default function Scroller() {
  React.useEffect(() => {
    if (!document.scrollingElement) return;
    const div = document.scrollingElement;
    div!.scrollTop = 0;

    const interval = setInterval(() => {
      div?.scrollBy({
        top: 1,
        behavior: "smooth",
      });

      if (div!.scrollHeight - div!.clientHeight - div!.scrollTop <= 1) {
        div!.scrollTop = 0;
      }
    }, 32);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <CoinList
        coins={MOCK_LOGIN_DATA.coins}
        chart_data={MOCK_LOGIN_DATA.coins_chart_data as never}
      />
      <CoinList
        coins={MOCK_LOGIN_DATA.coins}
        chart_data={MOCK_LOGIN_DATA.coins_chart_data as never}
      />
      <CoinList
        coins={MOCK_LOGIN_DATA.coins}
        chart_data={MOCK_LOGIN_DATA.coins_chart_data as never}
      />
      <CoinList
        coins={MOCK_LOGIN_DATA.coins}
        chart_data={MOCK_LOGIN_DATA.coins_chart_data as never}
      />
      <CoinList
        coins={MOCK_LOGIN_DATA.coins}
        chart_data={MOCK_LOGIN_DATA.coins_chart_data as never}
      />
      <CoinList
        coins={MOCK_LOGIN_DATA.coins}
        chart_data={MOCK_LOGIN_DATA.coins_chart_data as never}
      />
    </div>
  );
}
