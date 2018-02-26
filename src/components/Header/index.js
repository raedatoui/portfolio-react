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
import { RangeSlider } from "../Shared";

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
    const { nets, viewsource, dispatch } = this.props;

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
          <HeaderControls>
            <RangeSlider min={1} max={100} step={1} dispatch={dispatch} />
            <span>&nbsp;&nbsp;</span>
            <MuteButton onClick={() => this.mute()}>( {muteLabel} )</MuteButton>
            <span>&nbsp;&nbsp;&nbsp;</span>
            <a target="_blank" href={viewsource}>
              ( source )
            </a>
          </HeaderControls>
        </HeaderWrapper>
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
  z-index: 2;
`;

const HeaderWrapper = styled.div`
  background-color: rgba(255, 255, 255, 0.75);
  box-shadow: 0px 12px 10px -6px rgba(0, 0, 0, 0.4);
  padding: 0 1em;
`;

const HeaderLabel = styled.h1`
  margin: 0;
  display: inline-block;
  width: auto;
`;

const HeaderLinks = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  top: 0;
  height: 100%;
  align-items: center;
`;

const HeaderList = styled.u`
  list-style: none;
  display: flex;
  align-items: baseline;
  justify-content: center;
  perspective: 2000px;
`;

const HeaderControls = styled.div`
  display: flex;
  justify-content: flex-end;
  text-align: right;
  top: 0;
  height: 100%;
  position: absolute;
  right: 1em;
  align-items: center;
  &:visited {
    color: ${colors.red};
  }
  z-index: 2;
`;

const MuteButton = styled.span`
  cursor: pointer;
  color: ${colors.grey};
  &:hover {
    color: ${colors.red};
    text-decoration: underline;
  }
`;
