import { sendTransaction } from "@/lib/ethers";
import { formatCrypto } from "@/lib/utils";
import { Auth } from "@/models/auth";
import { useWeb3Auth } from "@web3auth/modal-react-hooks";
import { Info, Loader2 } from "lucide-react";
import { useState, FormEvent } from "react";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";

export default function SendMoneyForm({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const { provider } = useWeb3Auth();
  const balance = useSelector<{ auth: Auth }, string>(
    (state) => state.auth.balance
  );

  const handleSendTransaction = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!provider) return;
    if (loading) return;
    setLoading(true);

    const data = new FormData(event.currentTarget);
    sendTransaction(
      provider,
      data.get("destination") as string,
      data.get("amount") as string
    )
      .then(() => {
        toast.success("Transfer completed sucessfully!");
        setTimeout(() => {
          onComplete();
        }, 200);
      })
      .catch((e) => {
        console.error(e);
        toast.error("Could not complete transaction.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSendTransaction}>
      <div>
        <div className="flex items-center relative">
          <Input
            placeholder="0"
            type="number"
            className="text-[64px] h-17 appearance-none focus-visible:ring-0 border-0 w-[calc(100%-3ch)]"
            defaultValue={0}
            step="any"
            min={0}
            max={parseFloat(balance || "0")}
            name="amount"
            required
          />
          <span className="text-[64px] absolute right-0 top-[50%] translate-y-[-50%] text-muted-foreground pointer-events-none">
            ETH
          </span>
        </div>
        <p className="text-sm flex items-center gap-2 text-secondary-foreground mt-1">
          <Info width={14} height={14} />
          <span>{formatCrypto(parseFloat(balance || "0"))} max.</span>
        </p>
      </div>
      <Input
        required
        placeholder="Address"
        name="destination"
        className="text-[24px] h-16 appearance-none focus-visible:ring-0 border-0"
      />

      <Button disabled={loading}>
        {loading && (
          <>
            <Loader2 className="animate-spin" />
            Sending...
          </>
        )}
        {!loading && <>Send</>}
      </Button>
    </form>
  );
}
