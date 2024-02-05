/* eslint-disable react/prop-types */
import React, { useReducer, useState } from "react";
import "./Poll.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Poll = ({ data }) => {
  console.log(data);
  const [options, setOptions] = useState([
    { id: data.options[0]._id, label: data.options[0].text, votes: data.options[0].votes },
    { id: data.options[1]._id, label: data.options[1].text, votes: data.options[1].votes },
    { id: data.options[2]._id, label: data.options[2].text, votes: data.options[2].votes },
    { id: data.options[3]._id, label: data.options[3].text, votes: data.options[3].votes },
  ]);

  const handleOptionClick = async (id) => {
    await axios
      .put(
        `${import.meta.env.VITE_API}/polls/${data.id}`,
        { option_id: id },
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: localStorage.getItem("cookie"),
          },
        }
      )
      .then(({ data }) => {
        if (data) {
          setOptions([
            { id: data.options[0]._id, label: data.options[0].text, votes: data.options[0].votes },
            { id: data.options[1]._id, label: data.options[1].text, votes: data.options[1].votes },
            { id: data.options[2]._id, label: data.options[2].text, votes: data.options[2].votes },
            { id: data.options[3]._id, label: data.options[3].text, votes: data.options[3].votes },
          ]);
          toast.success("Your vote has been recorded");
        }
      })
      .catch((err) => {
        toast.error("some error occured");
        console.log(err);
      });
  };

  const getTotalVotes = () => options.reduce((total, option) => total + option.votes, 0);
  const totalVotes = getTotalVotes();

  return (
    <>
      <div className="poll">
        <div className="question">{data.question}</div>
        {options.map((option) => (
          <div id={option.id} key={option.id} className="option" onClick={() => handleOptionClick(option.id)}>
            <div className="label">{option.label}</div>
            <div className="percentage-bar-container">
              <div
                className={`percentage-bar ${option.votes > 0 ? "show-percentage" : ""}`}
                style={{ width: `${totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0}%` }}
              >
                {totalVotes > 0 ? ((option.votes / totalVotes) * 100).toFixed() : 0}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Poll;
