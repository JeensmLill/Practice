import { RightCode } from "~/api/type";
import { stroeSelector_account } from "~/store";

export const hasRight = (type: "route" | "button", code: RightCode) => {
  switch(type) {
    case "route":
      return stroeSelector_account().routeRights.includes(code);
    case "button":
      return stroeSelector_account().buttonRights.includes(code);
  }
};