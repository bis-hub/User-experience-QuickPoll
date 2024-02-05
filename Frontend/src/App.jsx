import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import { AppShell, MantineProvider } from "@mantine/core";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <MantineProvider
        theme={{ colorScheme: "light", primaryColor: "lime" }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Toaster />
        <AppShell
          padding="md"
          header={<Header height={60} p="xs" />}
          styles={(theme) => ({
            main: {
              backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
            },
          })}
        >
          <Outlet />
        </AppShell>
      </MantineProvider>
    </>
  );
}

export default App;
