import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import RankingTable from "./RankingTable";
import { Button } from "@/components/ui/button";
import { BarChart2 } from "lucide-react";

const Rankings = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full">
          <BarChart2 className="mr-2 h-4 w-4" /> Show Rankings
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full">
        <RankingTable />
      </SheetContent>
    </Sheet>
  );
};

export default Rankings;
