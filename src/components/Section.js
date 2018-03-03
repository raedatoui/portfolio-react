// @flow

import React from "react";
import styled from "styled-components";
import * as Types from "@src/types";

type Props = {|
  section: Types.Section,
  index: number,
  children?: React$Node
|};

const Section = (props: Props) => (
  <SectionWrapper index={props.index}>
    <SectionHeader>{props.section.name}</SectionHeader>
    {props.children}
  </SectionWrapper>
);

export default Section;

const SectionWrapper = styled.section`padding: 0 1rem;`;

const SectionHeader = styled.h2``;
