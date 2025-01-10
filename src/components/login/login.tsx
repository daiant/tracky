import Coins from "../coin/coins";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import Text from "../ui/text";

export default function LoginScreen({
  onLogin,
}: {
  onLogin: () => Promise<void> | void;
}) {
  return (
    <div>
      <LoginForm onLogin={onLogin} />
      <Coins />
    </div>
  );
}

function LoginForm({ onLogin }: { onLogin: () => Promise<void> | void }) {
  return (
    <div className="fixed inset-0 bg-gradient-to-t from-white from-35% to-transparent z-10 grid justify-center items-center">
      <Card className="bg-white/50 backdrop-blur-[2px]">
        <CardHeader className="flex justify-center items-center">
          <div className="size-8 bg-slate-400" />
          <Text variant="h1">Tracky</Text>
          <div className="border-t-[1px] border-slate-100">
            <Text variant="h2">Demo purposes only</Text>
          </div>
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
