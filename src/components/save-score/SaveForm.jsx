import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { BASE_URL } from "../../config";
import { useScore } from "../ScoreProvider";
import { Button } from "../ui/button";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import { submitScoreValidation } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

const SaveForm = ({ toggleDialog }) => {
  const { score } = useScore();
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const saveScore = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const { error, isValid } = submitScoreValidation(name);

    if (!isValid) {
      toast({
        title: "Submit failed",
        description: error,
        variant: "destructive",
      });
      return setIsLoading(false);
    }

    axios
      .post(`${BASE_URL}/addscore`, { name, score })
      .then((response) => {
        if (response.status === 200) {
          toast({
            title: "Score saved Successfully!",
          });
          toggleDialog(false);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  return (
    <form onSubmit={saveScore}>
      <div>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name..."
        />
      </div>
      <DialogFooter className="mt-4">
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Dismiss
          </Button>
        </DialogClose>
        <Button disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default SaveForm;
