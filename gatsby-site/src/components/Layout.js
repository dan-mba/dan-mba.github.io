import React from "react";
import {Container} from "@material-ui/core";
import {Helmet} from "react-helmet";
import {withPrefix} from "gatsby";
import NavBar from "./NavBar";

export default function Layout({children}) {
  return (
    <>
      <Helmet>
        <html lang="en" />
        <link rel="icon" href={`${withPrefix('/')}img/favicon.ico`} />
      </Helmet>
      <NavBar/>
      <Container maxWidth="xl" disableGutters>
        {children}
      </Container>
    </>
  );
};
