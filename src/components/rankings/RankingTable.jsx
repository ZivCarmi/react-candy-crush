import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../ui/Loader";
import { BASE_URL } from "@/config";
import { SheetHeader } from "../ui/sheet";

const RankingTable = () => {
  const [rankings, setRankings] = useState(null);

  const fetchRankings = async () => {
    const response = await axios.get(`${BASE_URL}/getrankings`);

    setRankings(response.data);
  };

  useEffect(() => {
    fetchRankings();
  }, []);

  if (!rankings) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <SheetHeader>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl mt-4 mb-6 text-center">
          Top 10 Ranks
        </h1>
      </SheetHeader>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rankings.map((rank) => (
            <TableRow key={rank._id}>
              <TableCell className="font-medium">{rank.name}</TableCell>
              <TableCell className="text-right">{rank.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default RankingTable;
