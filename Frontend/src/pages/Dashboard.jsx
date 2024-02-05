import { createStyles, Image, Container, Button, Group, rem, Center } from "@mantine/core";
import axios from "axios";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
// import { IconCheck } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  control: {
    [theme.fn.smallerThan("xs")]: {
      flex: 1,
    },
  },
}));

export default function HeroBullets() {
  const navigate = useNavigate();

  const { classes } = useStyles();
  useEffect(() => {
    const checkAuth = async () => {
      await axios
        .get(`${import.meta.env.VITE_API}/checkauth`, {
          headers: {
            Authorization: localStorage.getItem("cookie"),
          },
        })
        .then(() => {
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
      <Container>
        <Center>
          <Group mt={250}>
            <Link to={"/play"}>
              <Button radius="xl" size="xl" className={classes.control}>
                Play Polls
              </Button>
            </Link>
            <Link to={"/create"}>
              <Button variant="outline" radius="xl" size="xl" className={classes.control}>
                Create Polls
              </Button>
            </Link>
            <Link to={"/mypolls"}>
              <Button color="green" radius="xl" size="xl" className={classes.control}>
                My Polls
              </Button>
            </Link>
          </Group>
        </Center>
      </Container>
    </>
  );
}
