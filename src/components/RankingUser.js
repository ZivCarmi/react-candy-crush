const RankingUser = ({ name, score }) => {
  return (
    <li>
      <div className="rank-name">{name}</div>
      <div className="rank-score">{score}</div>
    </li>
  );
};

export default RankingUser;
