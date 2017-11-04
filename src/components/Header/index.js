// @flow

import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import type { WithDispatch } from "@src/store";
import * as Types from "@src/types";
import getHeader from "./actions";
import HeaderListItem from "./ListItem";
import { colors } from "@src/styles";

type Props = {|
  nets: Types.List,
  viewsource: string
|};

type OwnProps = {|
  ...Props,
  contentPath: string
|};

const mapStateToProps = (state: Types.State): Props => ({
  nets: state.lists.header,
  viewsource: state.viewsource
});

class HeaderInner extends React.Component<WithDispatch<OwnProps>> {
  componentDidMount() {
    this.props.dispatch(
      getHeader({
        contentPath: this.props.contentPath,
        listId: "header"
      })
    );
  }

  render() {
    const { nets, viewsource } = this.props;

    return (
      <HeaderOuterWrapper>
        <HeaderWrapper>
          <HeaderLabel>Raed Atoui</HeaderLabel>
          <HeaderLinks>
            <HeaderList>
              {nets &&
                nets.map((link, i) => (
                  <HeaderListItem
                    key={`header-link-${i}`}
                    index={i}
                    name={link.name}
                    link={link.link}
                  />
                ))}
            </HeaderList>
          </HeaderLinks>
        </HeaderWrapper>
        <SourceLink target="_blank" href={viewsource}>
          ( source )
        </SourceLink>
      </HeaderOuterWrapper>
    );
  }
}

export default connect(mapStateToProps)(HeaderInner);

const HeaderOuterWrapper = styled.header`
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  position: sticky;
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(255, 255, 255, 0.75);
  box-shadow: 0px 12px 10px -6px rgba(0, 0, 0, 0.4);
  padding: 0 1em;
`;

const HeaderLabel = styled.h1`margin: 0;`;

const HeaderLinks = styled.div``;

const HeaderList = styled.u`
  list-style: none;
  display: flex;
  align-items: baseline;
  justify-content: center;
  perspective: 2000px;
`;

const SourceLink = styled.a`
  margin: 0.75em -1em 0 -1em;
  display: inline-block;
  width: 100%;
  text-align: right;
  color: ${colors.red};
  &:visited {
    color: ${colors.red};
  }
`;
