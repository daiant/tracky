import { coins } from "@/lib";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Table, TableBody } from "../ui/table";
import Coin from "../coin/coin";

export default function LoginScreen({
  onLogin,
}: {
  onLogin: () => Promise<void> | void;
}) {
  return (
    <div>
      <LoginForm onLogin={onLogin} />
      <Table>
        <TableBody>
          {coins.map((c) => (
            <Coin coin={c} key={c.id} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function LoginForm({ onLogin }: { onLogin: () => Promise<void> | void }) {
  return (
    <div className="fixed inset-0 bg-gradient-to-t from-white from-35% to-transparent z-10 grid justify-center items-center">
      <Card className="bg-white/50 backdrop-blur-[2px]">
        <CardHeader className="flex justify-center items-center">
          <div className="size-8 bg-slate-400" />
          <h1 className="text-3xl font-bold">Tracky</h1>
          <h2 className="text-sm text-slate-500 border-t-[1px] border-slate-100">
            Demo purposes only
          </h2>
        </CardHeader>
        <CardContent>
          <Button onClick={onLogin} className="text-base">
            Connect your wallet
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
