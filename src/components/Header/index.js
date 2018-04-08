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
import { breakMd } from "@src/styles";

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
    const toggled = !this.state.muted;
    window.ga("send", "event", "muteBtn", toggled ? "mute" : "unmute");
    this.setState({
      muted: toggled
    });
  }

  onViewSource() {
    window.ga("send", "event", "github", "click");
  }

  render() {
    const { muted } = this.state;
    Master.mute = muted;
    const muteLabel = muted ? "unmute" : "mute";
    const { nets, viewsource, dispatch } = this.props;

    return (
      <HeaderOuterWrapper id="header">
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
            <HeaderControls>
              <RangeSlider min={1} max={100} step={1} dispatch={dispatch} />
              <span>&nbsp;&nbsp;</span>
              <MuteButton onClick={() => this.mute()}>
                ( {muteLabel} )
              </MuteButton>
              <span>&nbsp;&nbsp;&nbsp;</span>
              <a
                target="_blank"
                href={viewsource}
                onClick={() => this.onViewSource()}
              >
                ( source )
              </a>
            </HeaderControls>
          </HeaderLinks>
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
  padding: 0.25rem 1rem;
`;

const HeaderLabel = styled.h1`
  margin: 0;
  display: inline-block;
  width: auto;
`;

const HeaderLinks = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  @media (${breakMd}) {
    justify-content: center;
  }
`;

const HeaderList = styled.u`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (${breakMd}) {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
  }
  perspective: 2000px;
`;

const HeaderControls = styled.div`
  display: flex;
  justify-content: flex-end;
  text-align: right;
  align-items: center;
  font-size: 0.7rem;
  &:visited {
    color: ${colors.red};
  }
  z-index: 2;
  @media (${breakMd}) {
    right: 1rem;
    position: absolute;
    height: 100%;
    top: 0;
  }
`;

const MuteButton = styled.span`
  cursor: pointer;
  color: ${colors.grey};
  &:hover {
    color: ${colors.red};
    text-decoration: underline;
  }
`;
