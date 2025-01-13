import { Clipboard } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";

export default function ClipboardAction({ data }: { data: string }) {
  const handleCopy = async () => {
    toast.success("Copied wallet address to clipboard!");
    navigator.clipboard.writeText(data);
  };

  return (
    <Button
      onClick={handleCopy}
      variant="ghost"
      className="p-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all -translate-x-1"
    >
      <Clipboard width={14} height={14} />
    </Button>
  );
}
