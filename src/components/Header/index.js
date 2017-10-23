// @flow

import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import type { WithDispatch } from "@src/store";
import * as Types from "@src/types";
import getList from "./actions";

type Props = {|
  links: Types.List
|};

type OwnProps = {|
  ...Props,
  contentPath: string
|};

const mapStateToProps = (state: Types.State): Props => ({
  links: state.headerLinks
});

class HeaderInner extends React.Component<WithDispatch<OwnProps>> {
  componentDidMount() {
    this.props.dispatch(getList(this.props.contentPath));
  }

  render() {
    const links = this.props.links;

    return (
      <HeaderWrapper>
        <h1>Raed Atoui</h1>
        <ul>
          {links.map((link, i) => (
            <li key={`header-link-${i}`}>
              <a href={link.link}>{link.name}</a>
            </li>
          ))}
        </ul>
      </HeaderWrapper>
    );
  }
}

export default connect(mapStateToProps)(HeaderInner);

const HeaderWrapper = styled.div``;
