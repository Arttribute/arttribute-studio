import { User } from "@/models/User";
import { Card, CardContent, CardHeader } from "./ui/card";
import Image from "next/image";
import Link from "next/link";

interface Props {
  user: User;
}

const ArtistCard = ({ user }: Props) => {
  const tags = user.tags || [];
  return (
    <Card>
      <CardHeader className="p-4">
        <div className="overflow-hidden rounded-md">
          <Link href={`/artists/${user.web3Address}`}>
            <Image
              src={user.picture}
              alt={user.name}
              width={200}
              height={200}
              className="object-cover aspect-square transition-all hover:scale-105"
            />
          </Link>
        </div>
      </CardHeader>

      <CardContent className="mt-1 -ml-2 space-y-1">
        <h4>{user.name}</h4>
        <p className="text-xs text-muted-foreground">
          {user.description || "No description"}
        </p>
        <p className="text-xs text-foreground space-x-1">
          {tags.length === 0 && <span className="text-gray-500">No tags</span>}
          {tags[0] && <span className="text-green-900">#{tags[0]}</span>}
          {tags[1] && <span className="text-blue-900">#{tags[1]}</span>}
          {tags[2] && <span className="text-orange-900">#{tags[2]}</span>}
          {tags.length > 3 && (
            <span className="text-gray-500">+{tags.length - 3}</span>
          )}
        </p>
      </CardContent>
    </Card>
  );
};

export default ArtistCard;
