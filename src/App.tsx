import { Box, Container, CssBaseline } from "@material-ui/core";

import React from "react";
import TestForm from "./components/TestForm";

export default function App() {
  return (
    <>
      <CssBaseline />
      <Box m={4}>
        <Container maxWidth={"md"}>
          <TestForm />
        </Container>
      </Box>
    </>
  );
}
