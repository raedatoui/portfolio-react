// @flow

import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import type { WithDispatch } from "@src/store";
import * as Types from "@src/types";
import getList from "@src/components/Shared/actions";
import HeaderListItem from "./ListItem";

type Props = {|
  links: Types.List
|};

type OwnProps = {|
  ...Props,
  contentPath: string
|};

const mapStateToProps = (state: Types.State): Props => ({
  links: state.lists.header
});

class HeaderInner extends React.Component<WithDispatch<OwnProps>> {
  componentDidMount() {
    this.props.dispatch(
      getList({
        contentPath: this.props.contentPath,
        listId: "header"
      })
    );
  }

  render() {
    const links = this.props.links;

    return (
      <HeaderWrapper>
        <HeaderLabel>Raed Atoui</HeaderLabel>
        <HeaderList>
          {links &&
            links.map((link, i) => (
              <HeaderListItem
                key={`header-link-${i}`}
                index={i}
                name={link.name}
                link={link.link}
              />
            ))}
        </HeaderList>
      </HeaderWrapper>
    );
  }
}

export default connect(mapStateToProps)(HeaderInner);

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 12px 10px -6px rgba(0, 0, 0, 0.4);
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.75);
  position: sticky;
  padding: 0 1em;
`;

const HeaderLabel = styled.h1`margin: 0;`;

const HeaderList = styled.u`
  list-style: none;
  display: flex;
  align-items: baseline;
  justify-content: center;
  perspective: 2000px;
`;
