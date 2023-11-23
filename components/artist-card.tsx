import { User } from "@/models/User";
import { Card, CardContent, CardHeader } from "./ui/card";
import Image from "next/image";

interface Props {
  user: User;
}

const tags = ["top100", "ballondor", "skills"];

const ArtistCard = ({ user }: Props) => {
  return (
    <Card>
      <CardHeader className="p-4">
        <Image
          src={user.picture}
          alt={user.name}
          width={200}
          height={200}
          objectFit="cover"
          className="rounded-md"
        />
      </CardHeader>

      <CardContent className="mt-1 -ml-2 space-y-1">
        <h4>{user.name}</h4>
        <p className="text-xs text-muted-foreground">
          Brief title or phrase of the user
        </p>
        <p className="text-xs text-foreground space-x-1">
          <span className="text-green-900">#{tags[0]}</span>
          <span className="text-blue-900">#{tags[1]}</span>
          <span className="text-orange-900">#{tags[2]}</span>
        </p>
      </CardContent>
    </Card>
  );
};

export default ArtistCard;
// TODO: decide on whether to use a dialog to view user profile or separate page
