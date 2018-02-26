// @flow

import React from "react";
import styled from "styled-components";
import type { WithDispatch } from "@src/store";
import * as SharedActions from "./actions";
import { colors } from "@src/styles";
import { connect } from "react-redux";
import * as Types from "@src/types";

type Props = {|
  content: string
|};

export const Text = (props: Props) => (
  <Description dangerouslySetInnerHTML={{ __html: props.content }} />
);

const Description = styled.p``;

const rangeHandleColor = `${colors.grey}`;
const rangeHandleColorHover = `${colors.red}`;
const rangeHandleSize = "10px";
const rangeTrackColor = `${colors.lightGrey}`;
const rangeTrackHeight = "2px";
const rangeLabelColor = `${colors.grey}`;
const rangeLabelWidth = 50;

type SliderProps = {|
  frameRate: number
|};

type SliderOwnProps = {|
  ...SliderProps,
  dispatch: () => void,
  min: number,
  max: number,
  step: number
|};

type State = {|
  value: number
|};

const mapStateToProps = (state: Types.State): SliderProps => ({
  frameRate: state.frameRate
});

export class RangeSliderInner extends React.Component<
  WithDispatch<SliderOwnProps>,
  State
> {
  constructor(props: WithDispatch<SliderOwnProps>) {
    super(props);
    this.state = {
      value: 1
    };
  }

  componentWillReceiveProps(props: WithDispatch<SliderOwnProps>): void {
    this.setState({
      value: props.frameRate
    });
  }

  handleChange(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      const value: number = (event.target.value: any);
      this.setState({
        value: value
      });
      this.props.dispatch(SharedActions.setFrameRate(value));
    }
  }

  render() {
    return (
      <SliderContainer>
        <SliderInput
          onChange={this.handleChange.bind(this)}
          type="range"
          value={this.state.value}
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
        />
        <SliderLabel>( {this.state.value} )</SliderLabel>
      </SliderContainer>
    );
  }
}
export const RangeSlider = connect(mapStateToProps)(RangeSliderInner);

const SliderContainer = styled.div`
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SliderLabel = styled.span`
  position: relative;
  width: ${rangeLabelWidth}px;
  color: ${rangeLabelColor};
  line-height: 10px;
  text-align: center;
  margin-left: 8px;
`;

const SliderInput = styled.input`
  -webkit-appearance: none;
  width: calc(100% - ${rangeLabelWidth + 13}px);
  height: ${rangeTrackHeight};
  border-radius: 2px;
  background: ${rangeTrackColor};
  outline: none;
  padding: 0;
  margin: 0;

  &::-webkit-slider-thumb {
    appearance: none;
    width: ${rangeHandleSize};
    height: ${rangeHandleSize};
    border-radius: 50%;
    background: ${rangeHandleColor};
    cursor: pointer;
    transition: background 0.15s ease-in-out;

    &:hover {
      background: ${rangeHandleColorHover};
    }
  }

  &:active::-webkit-slider-thumb {
    background: ${rangeHandleColorHover};
  }

  &::-moz-range-thumb {
    width: $range-handle-size;
    height: $range-handle-size;
    border: 0;
    border-radius: 50%;
    background: $range-handle-color;
    cursor: pointer;
    transition: background 0.15s ease-in-out;

    &:hover {
      background: ${rangeHandleColorHover};
    }
  }

  &:active::-moz-range-thumb {
    background: ${rangeHandleColorHover};
  }
`;
