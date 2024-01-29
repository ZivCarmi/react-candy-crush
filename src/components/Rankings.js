import { useEffect, useState } from "react";
import axios from "axios";
import RankingList from "./RankingList";
import Loader from "./Loader";

export default function Rankings() {
  const [rankings, setRankings] = useState(null);

  const fetchRankings = async () => {
    const response = await axios.get("http://localhost:8000/getrankings");

    setRankings(response.data);
  };

  useEffect(() => {
    fetchRankings();
  }, []);

  return (
    <div className="ranking">
      <h2 className="ranking-title">Top 10 Ranks</h2>
      {rankings ? <RankingList rankings={rankings} /> : <Loader />}
    </div>
  );
}
