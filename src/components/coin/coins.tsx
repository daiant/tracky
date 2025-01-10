import { coins } from "@/lib";
import { Table, TableBody } from "../ui/table";
import Coin from "./coin";

export default function Coins() {
  return (
    <Table>
      <TableBody>
        {coins.map((c) => (
          <Coin coin={c} key={c.id} />
        ))}
      </TableBody>
    </Table>
  );
}
