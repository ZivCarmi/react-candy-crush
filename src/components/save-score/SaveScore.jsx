import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SaveForm from "./SaveForm";
import { useState } from "react";
import { Upload } from "lucide-react";
import { useScore } from "../ScoreProvider";

const SaveScore = () => {
  const { score } = useScore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild disabled={!score}>
        <Button className="w-full">
          <Upload className="mr-2 h-4 w-4" />
          Save Score
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Save your score</DialogTitle>
          <DialogDescription>
            If you score is high enough, you might see yourself on the
            leaderboard!
          </DialogDescription>
        </DialogHeader>
        <SaveForm toggleDialog={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default SaveScore;
