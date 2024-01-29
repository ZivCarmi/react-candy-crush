import React from "react";
import RankingUser from "./RankingUser";

export default function RankingList({ rankings }) {
  return (
    <ul>
      <li className="rank-head">
        <div className="name=head">Name</div>
        <div className="score-head">Score</div>
      </li>
      {rankings.map(({ name, score }, index) => (
        <RankingUser key={index} name={name} score={score} />
      ))}
    </ul>
  );
}
