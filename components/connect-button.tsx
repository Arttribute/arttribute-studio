import { useCallback, useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useMagicContext } from "./providers/MagicProvider";

interface Props {
  action: "Connect" | "Disconnect";
  setAccount: React.Dispatch<React.SetStateAction<string | null>>;
}

const postConnect = async (account: string, email?: string) => {
  const res = await fetch("http://localhost:3000/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ web3Address: account, email }),
  });
  if (res.ok) {
    console.log("Connected to server");
  } else {
    console.error("Failed to connect to server");
  }

  const data = await res.json();
  return data;
};

const ConnectButton = ({ action, setAccount }: Props) => {
  const [disabled, setDisabled] = useState(false);
  const { magic } = useMagicContext();

  const connect = useCallback(async () => {
    if (!magic) return;
    try {
      setDisabled(true);
      const accounts = await magic.wallet.connectWithUI();
      const { email } = await magic.user.requestInfoWithUI({
        scope: { email: "required" },
      });

      console.log(email);
      setDisabled(false);

      const data = await postConnect(accounts[0], email);
      console.log(data);

      localStorage.setItem("user", data);
      setAccount(accounts[0]);
    } catch (error) {
      setDisabled(false);
      console.error(error);
    }
  }, [magic, setAccount]);

  const disconnect = useCallback(async () => {
    if (!magic) return;
    try {
      setDisabled(true);
      await magic.user.logout();
      localStorage.removeItem("user");
      setDisabled(false);
      setAccount(null);
    } catch (error) {
      setDisabled(false);
      console.error(error);
    }
  }, [magic, setAccount]);

  return (
    <Button
      variant="ghost"
      size="sm"
      disabled={disabled}
      onClick={action == "Connect" ? connect : disconnect}
    >
      {disabled ? <Loader2 className="mx-auto h-4 w-4 animate-spin" /> : action}
    </Button>
  );
};

export default ConnectButton;
