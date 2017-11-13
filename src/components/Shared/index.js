// @flow

import React from "react";
import styled from "styled-components";

type Props = {|
  content: string
|};

export const Text = (props: Props) => (
  <Description dangerouslySetInnerHTML={{ __html: props.content }} />
);

const Description = styled.p`
  a {
    text-decoration: underline;
    &.no-dec {
      text-decoration: none;
    }
  }
`;
