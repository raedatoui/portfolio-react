// @flow

import React from "react";
import styled from "styled-components";
import * as Types from "@src/types";

type Props = {|
  section: Types.Section,
  children?: React$Node
|};

const Section = (props: Props) => (
  <SectionWrapper>
    <SectionHeader>{props.section.name}</SectionHeader>
    {props.children}
  </SectionWrapper>
);

export default Section;

const SectionWrapper = styled.section`padding: 1em;`;

const SectionHeader = styled.h2``;
