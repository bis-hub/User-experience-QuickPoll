/* eslint-disable react/prop-types */
import React, { useState } from "react";
import "./Poll.css";
import { Button } from "@mantine/core";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const MyPoll = ({ data }) => {
  const [options, setOptions] = useState([
    { id: 1, label: data.options[0].text, votes: data.options[0].votes },
    { id: 2, label: data.options[1].text, votes: data.options[1].votes },
    { id: 3, label: data.options[2].text, votes: data.options[2].votes },
    { id: 4, label: data.options[3].text, votes: data.options[3].votes },
  ]);
  const navigate = useNavigate();

  const handleOptionClick = (id) => {
    setOptions((prevOptions) =>
      prevOptions.map((option) => (option.id === id ? { ...option, votes: option.votes + 1 } : option))
    );
  };

  const getTotalVotes = () => options.reduce((total, option) => total + option.votes, 0);
  const totalVotes = getTotalVotes();

  const deletePoll = async () => {
    await axios
      .delete(`${import.meta.env.VITE_API}/polls/${data.id}`)
      .then((result) => {
        if (result) {
          toast.success("Poll deleted Successfully");
          navigate("/mypolls", { replace: true });
          setTimeout(() => {
            window.location.reload(false);
          }, 1000);
        } else {
          return toast.error("Some error occured");
        }
      })
      .catch((err) => {
        console.log(err);
        return toast.error("Some error occured");
      });
  };

  return (
    <>
      <div className="poll">
        <div className="question">
          <div>
            <b>{data.question}</b>
          </div>
          <div>
            <Button onClick={deletePoll} rightIcon={<FaTrash />} color="red" radius="xl" size="md">
              Delete
            </Button>
          </div>
        </div>
        {options.map((option) => (
          <div key={option.id} className="option">
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

export default MyPoll;
