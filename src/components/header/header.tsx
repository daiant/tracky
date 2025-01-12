import { formatNumber } from "@/lib/utils";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Clipboard } from "lucide-react";
import Text from "../ui/text";
import { useDispatch, useSelector } from "react-redux";
import { Auth } from "@/models/auth";
import { useWeb3Auth } from "@web3auth/modal-react-hooks";
import { store } from "@/lib/store/store";

function Header() {
  const account = useSelector<{ auth: Auth }, Auth>((state) => state.auth);
  const { logout } = useWeb3Auth();
  const dispatch = useDispatch<typeof store.dispatch>();

  if (!account) return null;

  const address = () => {
    if (!account.address) return "";
    return (
      account.address.substring(0, 5) +
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
    await logout();
    dispatch.auth.logout();
  };
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center gap-1 group cursor-default">
          <p className="italic">{address()}</p>
          {address() && (
            <Button
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
            {account.user?.profileImage && (
              <img
                src={account.user.profileImage}
                className="size-[28px] rounded-full"
              />
            )}
          </PopoverTrigger>
          <PopoverContent>
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

      <div className="text-center grid gap-4 justify-center">
        <Text variant="h2">Total account balance</Text>
        <Text variant="h1">{formatNumber(parseFloat(account.balance))}</Text>
        <Button variant="link">Send funds</Button>
      </div>
    </div>
  );
}

export default Header;
