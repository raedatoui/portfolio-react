// @flow

import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import type { WithDispatch } from "@src/store";
import * as Types from "@src/types";
import * as ProjectActions from "./actions";
//import * as SharedActions from "@src/components/Shared/actions";
import Nervous, { type NervousPoint } from "./nervous";
import { breakLg } from "@src/styles";
import { withRouter, type WithRouter } from "react-router-dom";

type Props = {|
  selectedProjectId: ?string,
  frameRate: number
|};

type OwnProps = {|
  ...Props,
  project: Types.Project,
  projectId: string,
  groupId: string,
  detune: number,
  disabled: boolean
|};

type State = {|
  showPixels: boolean
|};

const mapStateToProps = (state: Types.State): Props => ({
  selectedProjectId: state.selectedProjectId,
  frameRate: state.frameRate
});

class ProjectInner extends React.Component<
  WithRouter<WithDispatch<OwnProps>>,
  State
> {
  fx: HTMLCanvasElement;
  src: HTMLImageElement;
  context: CanvasRenderingContext2D;
  play: boolean;
  step: number;
  counter: number;
  raf: number;
  nervous: Nervous;
  blip: number;
  prev: Date;
  fpsInterval: number;
  delta: number;
  counter: number;

  constructor(props: WithDispatch<WithRouter<OwnProps>>) {
    super(props);
    this.play = false;
    this.step = 1;
    this.counter = 0;
    this.nervous = new Nervous(this.props.detune);
    this.blip = 0;
    this.delta = 1;
    this.counter = 0;
    this.state = {
      showPixels: false
    };
    this.prev = new Date();
    this.fpsInterval = 1000.0 / 5.0;
  }

  // componentDidUpdate(prevProps: WithDispatch<OwnProps>): void {
  //   // const selected: boolean =
  //   //   this.props.projectId === this.props.selectedProject;
  //   // const transitioned: boolean =
  //   //   this.props.selectedProject !== prevProps.selectedProject;
  //   // if (selected && transitioned && this.slider) this.slider.resize();
  //   this.fpsInterval = 1000.0 / this.props.frameRate;
  // }

  toggle() {
    const { history, projectId } = this.props;
    if (this.props.selectedProjectId !== projectId) {
      history.push(projectId);
      this.play = false;
      this.nervousPlay();
    } else {
      history.push("/");
      this.props.dispatch(ProjectActions.closeAllProjects());
    }
  }

  pixelate(v: number = 0) {
    this.context = this.fx.getContext("2d");
    // if in play mode use that value, else use slider value
    const size = (this.play ? v : 6) * 0.01,
      // cache scaled width and height
      w = this.fx.width * size,
      h = this.fx.height * size;

    // draw original image to the scaled size
    this.context.drawImage(this.src, 0, 0, w, h);

    // then draw that scaled image thumb back to fill canvas
    // As smoothing is off the result will be pixelated
    this.context.drawImage(
      this.fx,
      0,
      0,
      w,
      h,
      0,
      0,
      this.fx.width,
      this.fx.height
    );
  }

  nervousPlay() {
    // increase or decrease value
    this.counter += this.step;

    const note: NervousPoint = this.nervous.notes[this.counter];
    // pixelate image with current value
    this.nervous.play(note.midi);
    this.pixelate(note.pixelation);

    if (this.counter % (this.nervous.notes.length / 4))
      this.fpsInterval = 1000 / (Math.random() * this.props.frameRate + 1);

    if (this.counter === 0 || this.counter === this.nervous.notes.length - 1) {
      this.step = -this.step;
    }
  }

  animate() {
    // loop
    if (this.play) {
      if (this.props.selectedProjectId === this.props.projectId) {
        this.blip++;
        if (this.blip === 10) {
          window.cancelAnimationFrame(this.raf);
          this.blip = 0;
          this.nervous.stop();
          return;
        }
        this.nervousPlay();
      } else {
        this.raf = window.requestAnimationFrame(this.animate.bind(this));
        const now: number = Date.now();
        const elapsed: number = now - this.prev.getTime();
        if (elapsed > this.fpsInterval) {
          this.prev.setTime(now - elapsed % this.fpsInterval);
          this.nervousPlay();
          // this.counter += 1;
          if (this.props.frameRate >= 100) this.delta = -1;
          if (this.props.frameRate <= 1) this.delta = 1;
          // if (this.counter === 4) {
          //   this.props.dispatch(
          //     SharedActions.setFrameRate(this.props.frameRate +  this.delta)
          //   );
          // this.counter = 0;
          // }
        }
      }
    } else {
      this.nervous.stop();
      window.cancelAnimationFrame(this.raf);
    }
  }

  handleImageLoaded() {
    this.context = this.fx.getContext("2d");
    this.fx.width = this.src.width;
    this.fx.height = this.src.height;
    // this.context.mozImageSmoothingEnabled = false;
    // this.context.webkitImageSmoothingEnabled = false;
    this.context.imageSmoothingEnabled = false;
    this.pixelate();
  }

  handleMouseOver = () => {
    this.setState({ showPixels: true });
    if (!this.play) {
      this.play = true;
      this.animate();
    }
  };

  handleMouseOut = () => {
    this.setState({ showPixels: false });
    this.play = false;
  };

  render() {
    const { project, projectId, frameRate, disabled } = this.props;
    const showDetails = this.props.projectId === this.props.selectedProjectId;
    const showPixels = this.state.showPixels;
    const headerClass = (showPixels || showDetails).toString();
    this.fpsInterval = 1000.0 / frameRate;
    return (
      <Project
        id={projectId}
        tabIndex="0"
        onBlur={this.handleMouseOut}
        onFocus={this.handleMouseOver}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
        className={`Grid-cell dis-${disabled.toString()} det-${showDetails.toString()}`}
      >
        <Card onClick={() => this.toggle()}>
          <FxWrapper>
            <img
              src={project.thumb}
              alt={project.title}
              onLoad={() => this.handleImageLoaded()}
              ref={ref => {
                if (ref) this.src = ref;
              }}
            />
            <canvas
              className={showPixels ? "showPixels" : ""}
              ref={ref => {
                if (ref) this.fx = ref;
              }}
            />
          </FxWrapper>

          <Header className={`show-${headerClass}`}>
            <span>{project.title}</span>
          </Header>
        </Card>
      </Project>
    );
  }
}

export default withRouter(connect(mapStateToProps)(ProjectInner));

const Project = styled.div`
  hr {
    height: 1px;
    border: none;
    background-color: #ddd;
    margin: 0.61rem 0;
  }
  &.dis-true {
    opacity: 0.1;
    display: none;
  }
  &:focus {
    outline: none;
  }
  @media (${breakLg}) {
    &.dis-true {
      display: block;
    }
  }
`;

const Card = styled.div`
  width: 100%;
`;

const Header = styled.h5`
  text-align: center;
  border-top: 1px solid #ccc;
  padding: 0.5rem;
  visibility: hidden;
  span {
    cursor: pointer;
  }
  &.show-true {
    visibility: visible;
  }
`;

const FxWrapper = styled.div`
  max-height: 400px;
  position: relative;
  cursor: pointer;
  img {
    opacity: 1;
    width: 100%;
    display: flex;
  }

  canvas {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    image-rendering: optimizeSpeed;
    image-rendering: -moz-crisp-edges;
    image-rendering: -webkit-optimize-contrast;
    image-rendering: -o-crisp-edges;
    image-rendering: crisp-edges;
    -ms-interpolation-mode: nearest-neighbor;
    visibility: hidden;
    &.showPixels {
      visibility: visible;
    }
  }
`;
