import Rankings from "./rankings/Rankings";
import SaveScore from "./save-score/SaveScore";

const ActionButtons = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
      <SaveScore />
      <Rankings />
    </div>
  );
};

export default ActionButtons;
