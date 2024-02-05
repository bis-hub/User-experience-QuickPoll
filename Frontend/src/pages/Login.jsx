import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useInputState("");
  const [password, setPassword] = useInputState("");

  const navigate = useNavigate();

  const LoginUser = async () => {
    if (!username || !password) {
      return toast.error("Please fill all input fields");
    } else {
      await axios
        .post(
          `${import.meta.env.VITE_API}/users/login`,
          { username, password },
          {
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            },
          }
        )
        .then(({ data }) => {
          console.log(data);
          localStorage.setItem("cookie", data.token);
          window.location.assign("/dashboard");
          // navigate("/dashboard", { replace: true });
          toast.success("Welcome back User :)");
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.error);
        });
    }
  };
  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
      >
        Welcome back User!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor size="sm" component="button">
          <Link to={"/register"}>Create account</Link>
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          label="Username"
          placeholder="SpookyWooky327"
          value={username}
          onChange={setUsername}
          required
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          value={password}
          onChange={setPassword}
          required
          mt="md"
        />
        <Group position="apart" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl" onClick={LoginUser}>
          Login
        </Button>
      </Paper>
    </Container>
  );
}
