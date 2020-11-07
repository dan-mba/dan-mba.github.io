import React from "react";
import {Container} from "@material-ui/core";
import NavBar from "./NavBar";

export default function Layout({children}) {
  return (
    <>
      <NavBar/>
      <Container maxWidth="xl" disableGutters>
        {children}
      </Container>
    </>
  );
};
