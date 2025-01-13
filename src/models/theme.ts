import { createModel } from "@rematch/core";
import { RootModel } from ".";

export const theme = createModel<RootModel>()({
  state: "light",
  reducers: {
    toggle(state) {
      if (state == "light") {
        return "dark";
      }
      return "light";
    },
  },
});
