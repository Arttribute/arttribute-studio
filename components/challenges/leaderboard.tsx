import Image from "next/image";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function LeaderBoard({ submissions }: { submissions: any[] }) {
  //sort submission by highest votes
  submissions.sort((a, b) => b.votes - a.votes);

  return (
    <div className=" border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Creation</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Creator</TableHead>
            <TableHead className="text-right">Votes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions.map((submission) => (
            <TableRow key={submission._id}>
              <TableCell className="font-medium py-1.5">
                <Image
                  src={submission.image_url}
                  alt="submission"
                  width={48}
                  height={48}
                  className="rounded-lg object-cover transition-all aspect-[1]"
                />
              </TableCell>
              <TableCell>{submission.title}</TableCell>
              <TableCell>{submission.owner?.name}</TableCell>
              <TableCell className="text-right">{submission.votes} </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
