import React, { useEffect, useState } from "react";
import Poll from "../components/Poll";
import { Container } from "@mantine/core";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Play = () => {
  const [pollsData, setPollsData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPolls = async () => {
      await axios
        .get(`${import.meta.env.VITE_API}/polls`, {
          headers: {
            Authorization: localStorage.getItem("cookie"),
          },
        })
        .then(({ data }) => {
          setPollsData(data);
        })
        .catch((err) => {
          navigate("/login", { replace: true });
          toast.error("Please login first");
          console.log(err);
        });
    };
    fetchPolls();
  }, []);
  return (
    <>
      <Container>
        {pollsData.map((pollData) => (
          <Poll key={pollData.id} data={pollData} />
        ))}
      </Container>
    </>
  );
};

export default Play;
