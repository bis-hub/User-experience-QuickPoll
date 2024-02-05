import React, { useEffect, useState } from "react";
import "./CreatePoll.css";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePoll = () => {
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const navigate = useNavigate();

  const createPoll = async () => {
    if (!question || !option1 || !option2 || !option3 || !option4) {
      toast.error("Enter all the fields");
    } else {
      await axios
        .post(
          `${import.meta.env.VITE_API}/polls`,
          { question, options: [{ text: option1 }, { text: option2 }, { text: option3 }, { text: option4 }] },
          {
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              Authorization: localStorage.getItem("cookie"),
            },
          }
        )
        .then(({ data }) => {
          console.log(data);
          // navigate("/dashboard", { replace: true });
          toast.success("Poll created successfully");
        })
        .catch((err) => {
          console.log(err);
          navigate("/login", { replace: true });
          toast.error("Please login first");
          toast.error(err.response.data.error);
        });
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      await axios
        .get(`${import.meta.env.VITE_API}/checkauth`, {
          headers: {
            Authorization: localStorage.getItem("cookie"),
          },
        })
        .then((data) => {
          // console.log(data);
        })
        .catch((err) => {
          console.log(err);
          navigate("/login", { replace: true });
          toast.error("Please login first");
          console.log(err);
        });
    };
    checkAuth();
  }, []);

  return (
    <>
      <div className="poll-container">
        <div className="poll-title">Create Your Poll</div>
        <div className="input-group">
          <label htmlFor="topic">Topic:</label>
          <input
            type="text"
            id="topic"
            placeholder="Enter your question topic..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="option1">Option 1:</label>
          <input
            type="text"
            id="option1"
            placeholder="Enter answer option 1..."
            value={option1}
            onChange={(e) => setOption1(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="option2">Option 2:</label>
          <input
            type="text"
            id="option2"
            placeholder="Enter answer option 2..."
            value={option2}
            onChange={(e) => setOption2(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="option3">Option 3:</label>
          <input
            type="text"
            id="option3"
            placeholder="Enter answer option 3..."
            value={option3}
            onChange={(e) => setOption3(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="option4">Option 4:</label>
          <input
            type="text"
            id="option4"
            placeholder="Enter answer option 4..."
            value={option4}
            onChange={(e) => setOption4(e.target.value)}
          />
        </div>
        <button className="submit-btn" onClick={createPoll}>
          Create Poll
        </button>
      </div>
    </>
  );
};

export default CreatePoll;
