import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { store } from "@/lib/store/store";

export default function ThemeChanger() {
  const theme = useSelector<{ theme: string }, string>((state) => state.theme);
  const dispatch = useDispatch<typeof store.dispatch>();
  return (
    <Button variant="link" className="px-0" onClick={dispatch.theme.toggle}>
      {theme === "light" && <Moon size={18} />}
      {theme !== "light" && <Sun size={18} />}
    </Button>
  );
}
