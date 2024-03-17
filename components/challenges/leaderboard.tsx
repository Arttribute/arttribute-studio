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

const submissions = [
  {
    submission: "INV001",
    image: "/main.webp",
    title: "Paid",
    totalPoints: "250",
    creator: "AI artist",
  },
  {
    submission: "INV002",
    image: "/main.webp",
    title: "Pending",
    totalPoints: "150",
    creator: "PayPal",
  },
  {
    submission: "INV003",
    image: "/main.webp",
    title: "Unpaid",
    totalPoints: "350",
    creator: "Traditional Artist",
  },
  {
    submission: "INV004",
    image: "/main.webp",
    title: "Paid",
    totalPoints: "450",
    creator: "AI artist",
  },
  {
    submission: "INV005",
    image: "/main.webp",
    title: "Paid",
    totalPoints: "550",
    creator: "PayPal",
  },
  {
    submission: "INV006",
    image: "/main.webp",
    title: "Pending",
    totalPoints: "200",
    creator: "Traditional Artist",
  },
  {
    submission: "INV007",
    image: "/main.webp",
    title: "Unpaid",
    totalPoints: "300",
    creator: "AI artist",
  },
];

export function LeaderBoard() {
  return (
    <div className=" border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Creation</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Creator</TableHead>
            <TableHead className="text-right">Points</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions.map((submission) => (
            <TableRow key={submission.submission}>
              <TableCell className="font-medium py-1.5">
                <Image
                  src={submission.image}
                  alt="submission"
                  width={48}
                  height={48}
                  className="rounded-lg"
                />
              </TableCell>
              <TableCell>{submission.title}</TableCell>
              <TableCell>{submission.creator}</TableCell>
              <TableCell className="text-right">
                {submission.totalPoints}{" "}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
