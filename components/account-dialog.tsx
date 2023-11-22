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

interface Props {
  user: User;
  setAccount: React.Dispatch<React.SetStateAction<User | null>>;
}

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
          email={user.email}
          picture={user.picture}
          setAccount={setAccount}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AccountDialog;
