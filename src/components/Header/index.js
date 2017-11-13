// @flow

import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import type { WithDispatch } from "@src/store";
import * as Types from "@src/types";
import getHeader from "./actions";
import HeaderListItem from "./ListItem";
import { colors } from "@src/styles";
import { Master } from "tone";

type Props = {|
  nets: Types.List,
  viewsource: string
|};

type OwnProps = {|
  ...Props,
  contentPath: string
|};

type State = {|
  muted: boolean
|};

const mapStateToProps = (state: Types.State): Props => ({
  nets: state.lists.header,
  viewsource: state.viewsource
});

class HeaderInner extends React.Component<WithDispatch<OwnProps>, State> {
  constructor(props: WithDispatch<OwnProps>) {
    super(props);
    this.state = {
      muted: false
    };
  }

  componentDidMount() {
    this.props.dispatch(
      getHeader({
        contentPath: this.props.contentPath,
        listId: "header"
      })
    );
  }

  mute() {
    this.setState({
      muted: !this.state.muted
    });
  }

  render() {
    const { muted } = this.state;
    Master.mute = muted;
    const muteLabel = muted ? "unmute" : "mute";
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
                    muted={muted}
                  />
                ))}
            </HeaderList>
          </HeaderLinks>
        </HeaderWrapper>
        <SourceLink>
          <MuteButton onClick={() => this.mute()}>( {muteLabel} )</MuteButton>
          <span>&nbsp;&nbsp;&nbsp;</span>
          <a target="_blank" href={viewsource}>
            ( source )
          </a>
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
  z-index: 1;
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

const SourceLink = styled.div`
  margin: 0.75em -1em 0 -1em;
  display: inline-block;
  width: 100%;
  text-align: right;
  &:visited {
    color: ${colors.red};
  }
`;

const MuteButton = styled.span`
  cursor: pointer;
  color: ${colors.black};
  &:hover {
    color: ${colors.red};
    text-decoration: underline;
  }
`;
