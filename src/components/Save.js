import axios from "axios";
import { useState } from "react";
import { useScore } from "./ScoreProvider";
import { BASE_URL } from "../config";

export default function Save() {
  const { score } = useScore();
  const [nameValue, setNameValue] = useState("");
  const [nameError, setNameError] = useState("");
  const [message, setMessage] = useState("");

  // on input change
  const handleChange = (e) => setNameValue(e.target.value);

  // on button click
  const validateAndSubmit = () => {
    if (nameValue === "") {
      setNameError("Name cannot be empty");
    } else if (nameValue.length < 2) {
      setNameError("Name must contain at least 2 characters");
    } else if (nameValue.length > 12) {
      setNameError("Name can not contain more than 12 characters");
    } else {
      setNameError("");
      saveScore();
    }
  };

  const saveScore = async () => {
    const scoreData = {
      name: nameValue,
      score,
    };

    axios
      .post(`${BASE_URL}/addscore`, scoreData)
      .then((response) => {
        if (response.status === 200) {
          setMessage(response.data.message);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="save-score-box">
      <h2 className="save-score-title">Save Score</h2>
      <div className="name-input">
        <input
          type="text"
          value={nameValue}
          onChange={handleChange}
          placeholder="Your name..."
        />
        {nameError && <div className="error">{nameError}</div>}
      </div>
      <button
        type="button"
        className="save-score-btn"
        onClick={validateAndSubmit}
      >
        Submit
      </button>
      {message && <div className="success">{message}</div>}
    </div>
  );
}
