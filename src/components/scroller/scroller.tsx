import React from "react";

export default function Scroller({ children }: { children: React.ReactNode }) {
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

  return <div>{children}</div>;
}
