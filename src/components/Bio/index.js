// @flow

import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import getBio from "./actions";
import type { WithDispatch } from "@src/store";
import * as Types from "@src/types";

type Props = {|
  bio: ?Types.Bio
|};

type OwnProps = {|
  ...Props,
  contentPath: string
|};

const mapStateToProps = (state: Types.State): Props => ({
  bio: state.bio
});

class BioInner extends React.Component<WithDispatch<OwnProps>> {
  componentDidMount() {
    this.props.dispatch(getBio(this.props.contentPath));
  }

  render() {
    const bio = this.props.bio ? this.props.bio.content : "";
    const link = this.props.bio ? this.props.bio.link : "";

    return (
      <BioText>
        {bio}
        <a href={link}>view full resume</a>
      </BioText>
    );
  }
}

export default connect(mapStateToProps)(BioInner);

const BioText = styled.p`margin: 0 1em;`;
