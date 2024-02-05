import React from "react";
import { useState } from "react";
import { createStyles, Header, Container, Group, Burger, rem, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "react-router-dom";
import imgUrl from "../assets/logo.png";

const useStyles = createStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },

  links: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("xs")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({ variant: "light", color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor }).color,
    },
  },
}));

// interface HeaderSimpleProps {
//   links: { link: string, label: string }[];
// }

export default function MyHeader() {
  const links = [
    {
      link: "/",
      label: "Home",
    },
    {
      link: "/play",
      label: "Play",
    },
    {
      link: "/dashboard",
      label: "Dashboard",
    },
    {
      link: "/login",
      label: "Login",
    },
    {
      link: "/register",
      label: "Register",
    },
    {
      link: "/logout",
      label: "Logout",
    },
  ];
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const { classes, cx } = useStyles();

  const cookie = localStorage.getItem("cookie");

  const items = links.map((link) => (
    <Link
      key={link.label}
      to={link.link}
      className={cx(classes.link, { [classes.linkActive]: active === link.link })}
      onClick={() => {
        setActive(link.link);
      }}
    >
      {link.label}
    </Link>
  ));

  return (
    <Header height={80} mb={120}>
      <Container className={classes.header}>
        <img src={imgUrl} alt="logo" width={300} height={300} style={{ marginLeft: "-150px" }} />
        <Text style={{ fontWeight: "900", fontSize: "" }}></Text>
        {cookie && (
          <Group spacing={5} className={classes.links}>
            {items}
          </Group>
        )}

        <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
      </Container>
    </Header>
  );
}

// export default Header;
