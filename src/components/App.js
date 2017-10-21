// @flow
import React from "react";
import styled from "styled-components";
import { Projects } from "./Projects";
import Bio from "./Bio";
import Header from "./Header";

export const App = () => (
  <AppWrapper>
    <Header />
    <Bio />
    <Projects />
  </AppWrapper>
);

const AppWrapper = styled.div`background: white;`;
