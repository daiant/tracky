import { formatCrypto } from "@/lib/utils";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CircleUserRound, Clipboard } from "lucide-react";
import Text from "../ui/text";
import { useDispatch, useSelector } from "react-redux";
import { Auth } from "@/models/auth";
import { useWeb3Auth } from "@web3auth/modal-react-hooks";
import { store } from "@/lib/store/store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "../ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import SendMoneyForm from "../transaction-form/transaction-form";
import { useState } from "react";

function Header() {
  const account = useSelector<{ auth: Auth }, Auth>((state) => state.auth);
  const { logout } = useWeb3Auth();
  const dispatch = useDispatch<typeof store.dispatch>();

  const [dialogOpen, setDialogOpen] = useState(false);

  if (!account) return null;

  const address = () => {
    if (!account.address) return "";
    return (
      account.address.substring(2, 8) +
      " ... " +
      account.address.substring(account.address.length - 5)
    );
  };

  const name = () => {
    if (!account?.user) return "";
    if (account.user.name)
      return account.user.name.split(" ").at(0)?.toLowerCase();
    return account.user.email;
  };

  const handleLogout = async () => {
    dispatch.auth.logout();
    await logout();
  };

  const handleCopy = async () => {
    navigator.clipboard.writeText(account.address);
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center gap-1 group cursor-default">
          <p>{address()}</p>
          {address() && (
            <Button
              onClick={handleCopy}
              variant="ghost"
              className="p-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all -translate-x-1"
            >
              <Clipboard width={14} height={14} />
            </Button>
          )}
        </div>
        <Popover>
          <PopoverTrigger className="flex items-center gap-3">
            <p className="text-base">{name()}</p>
            <CircleUserRound />
          </PopoverTrigger>
          <PopoverContent className="right-1">
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full justify-start"
            >
              Logout
            </Button>
          </PopoverContent>
        </Popover>
      </div>

      <div className="text-center grid justify-center py-2.5">
        <Text variant="h2">Total account balance</Text>
        <Text variant="h1">{formatCrypto(parseFloat(account.balance))}</Text>
        <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen(false)}>
          <Button
            variant="ghost"
            className="text-sm text-slate-900 font-medium"
            onClick={() => setDialogOpen(true)}
          >
            Send Funds
          </Button>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-lg font-medium">
                Send to someone
              </DialogTitle>
              <DialogDescription>Testing purposes only</DialogDescription>
            </DialogHeader>
            <SendMoneyForm onComplete={() => setDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default Header;
