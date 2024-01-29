import Rankings from "./Rankings";
import Save from "./Save";
import { useScore } from "./ScoreProvider";

const SidePanel = () => {
  const { score } = useScore();

  return (
    <div className="side-panel">
      {!!score && <Save />}
      <Rankings />
    </div>
  );
};

export default SidePanel;
