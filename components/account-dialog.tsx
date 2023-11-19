import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AccountForm from "./account-form";
import { User } from "@/models/User";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

interface Props {
  user: User;
  setAccount: React.Dispatch<React.SetStateAction<User | null>>;
}

export const ConfirmDeleteDialog = ({
  web3Address,
  setAccount,
}: {
  web3Address: string;
  setAccount: React.Dispatch<React.SetStateAction<User | null>>;
}) => {
  const [disabled, setDisabled] = useState(false);

  const deleteAccount = async (account: string) => {
    setDisabled(true);
    const res = await fetch(`/api/users/${account}`, {
      method: "DELETE",
    });
    if (res.ok) {
      console.log("Deleted from server");
      localStorage.removeItem("user");
      setAccount(null);
    } else {
      console.error("Failed to delete from server");
    }
    setDisabled(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10 px-4 py-2">
        Delete Account
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => deleteAccount(web3Address)}
            disabled={disabled}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10 px-4 py-2"
          >
            Continue
          </AlertDialogAction>
          {/* TODO: Toast success */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const AccountDialog = ({ user, setAccount }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild className="w-full">
        <Button variant="outline" className="mx-auto">
          Manage Account
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when done.
          </DialogDescription>
        </DialogHeader>
        <AccountForm
          web3Address={user.web3Address}
          name={user.name}
          email={user.email ?? ""}
          description={user.description ?? ""}
          tags={user.tags}
          picture={user.picture}
          setAccount={setAccount}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AccountDialog;
