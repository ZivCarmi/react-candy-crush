import Blank from "../images/blank.png";

export default function Candy({ candy, index, ...props }) {
  return (
    <img
      src={candy}
      alt="Candy"
      width={70}
      height={70}
      data-index={index}
      draggable={!candy.includes(Blank)}
      onDragStart={props.onDragStart}
      onDragOver={props.onDragOver}
      onDragEnter={(e) => e.preventDefault()}
      onDragLeave={(e) => e.preventDefault()}
      onDragEnd={props.onDragEnd}
      onClick={props.isHintClicked ? props.setCandyToHammerTarget : null}
      onTouchStart={props.onTouchStart}
      onTouchMove={props.onTouchMove}
      onTouchEnd={props.onTouchEnd}
    />
  );
}
