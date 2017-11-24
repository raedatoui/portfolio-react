// @flow

import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import Flickity from "flickity";
import type { WithDispatch } from "@src/store";
import * as Types from "@src/types";
import * as ProjectActions from "./actions";
import { copy } from "@src/styles";
import { Text } from "@src/components/Shared";
import { colors } from "@src/styles";
import Nervous, { type NervousPoint } from "./nervous";

type Props = {|
  selectedProject: ?string
|};

type OwnProps = {|
  ...Props,
  project: Types.Project,
  projectId: string,
  detune: number
|};

type State = {|
  showPixels: boolean
|};

const mapStateToProps = (state: Types.State): Props => ({
  selectedProject: state.selectedProject
});

const projectFields: Array<{| field: string, label: string |}> = [
  { field: "agency", label: "Agency: " },
  { field: "year", label: "Year: " },
  { field: "role", label: "Role: " },
  { field: "tech", label: "Tech: " }
];

class ProjectInner extends React.Component<WithDispatch<OwnProps>, State> {
  fx: HTMLCanvasElement;
  src: HTMLImageElement;
  context: CanvasRenderingContext2D;
  play: boolean;
  step: number;
  counter: number;
  raf: number;
  nervous: Nervous;
  blip: number;
  slider: Flickity;

  constructor(props: WithDispatch<OwnProps>) {
    super(props);
    this.play = false;
    this.step = 1;
    this.counter = 0;
    this.nervous = new Nervous(this.props.detune);
    this.blip = 0;
    this.state = {
      showPixels: false
    };
  }

  componentDidMount() {
    this.slider = new Flickity(`.carousel-${this.props.projectId}`, {
      pageDots: false
    });
  }

  componentDidUpdate(prevProps: OwnProps) {
    const selected: boolean =
      this.props.projectId === this.props.selectedProject;
    const transitioned: boolean =
      this.props.selectedProject !== prevProps.selectedProject;
    if (selected && transitioned && this.slider) this.slider.resize();
  }

  toggle() {
    const projectId = this.props.projectId;
    if (this.props.selectedProject !== projectId) {
      this.props.dispatch(ProjectActions.openProject(this.props.projectId));
      this.play = false;
      this.nervousPlay();
    } else {
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

    if (this.counter === 0 || this.counter === this.nervous.notes.length - 1) {
      this.step = -this.step;
    }

    // loop
    if (this.play) {
      if (this.props.selectedProject === this.props.projectId) {
        this.blip++;
        if (this.blip === 10) {
          window.cancelAnimationFrame(this.raf);
          this.blip = 0;
          this.nervous.stop();
          return;
        }
      }
      this.raf = window.requestAnimationFrame(this.nervousPlay.bind(this));
    } else {
      this.nervous.stop();
      window.cancelAnimationFrame(this.raf);
    }
  }

  handleImageLoaded() {
    this.context = this.fx.getContext("2d");
    // this.context.mozImageSmoothingEnabled = false;
    // this.context.webkitImageSmoothingEnabled = false;
    this.context.imageSmoothingEnabled = false;
    this.pixelate();
  }

  handleMouseOver = () => {
    this.setState({ showPixels: true });
    if (!this.play) {
      this.play = true;
      this.nervousPlay();
    }
  };

  handleMouseOut = () => {
    this.setState({ showPixels: false });
    this.play = false;
  };

  render() {
    const { project, projectId } = this.props;
    const showDetails = this.props.projectId === this.props.selectedProject;
    const showPixels = this.state.showPixels;

    return (
      <Project
        id={projectId}
        tabIndex="0"
        onBlur={this.handleMouseOut}
        onFocus={this.handleMouseOver}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
      >
        <Header onClick={() => this.toggle()}>
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
          <span>{project.title}</span>
        </Header>
        {showDetails && (
          <DetailWrapper>
            <Text content={project.description} />
            <MetaWrapper>
              {projectFields.map(field => {
                return (
                  field.field in project && (
                    <MetaLine key={`${projectId}-${field.field}`}>
                      <MetaLabel>{field.label}</MetaLabel>
                      <MetaValue
                        dangerouslySetInnerHTML={{
                          __html: project[field.field]
                        }}
                      />
                    </MetaLine>
                  )
                );
              })}
            </MetaWrapper>
          </DetailWrapper>
        )}
        <CarouselWrapper
          className={`carousel carousel-${projectId} show-${showDetails}`}
        >
          <div className="carousel-cell" />
          <div className="carousel-cell" />
          <div className="carousel-cell" />
          <div className="carousel-cell" />
          <div className="carousel-cell" />
        </CarouselWrapper>
        <hr />
      </Project>
    );
  }
}

export default connect(mapStateToProps)(ProjectInner);

const Project = styled.div`
  position: relative;
  hr {
    height: 1px;
    border: none;
    background-color: #ddd;
    margin: 0.61em 0;
  }
  &:focus {
    outline: 2px dotted ${colors.red};
  }
`;

const Header = styled.h4`
  min-height: 140px;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-content: center;
  align-items: center;
  cursor: pointer;
  margin: 0.5em 0;
  transition: 0.25s all;

  span {
    cursor: pointer;
  }
  &:hover {
    color: ${colors.red};
  }
`;

const DetailWrapper = styled.div``;

const MetaWrapper = styled.div``;

const MetaLine = styled(copy)`display: flex;`;

const MetaLabel = styled.span`
  font-weight: 600;
  width: 90px;
  margin-right: 0.5em;
  display: inline-block;
  text-align: right;
`;

const MetaValue = styled.span`display: inline-block;`;

const FxWrapper = styled.div`
  position: relative;
  width: 20%;
  max-width: 140px;
  height: 140px;
  margin: 0 1em 0 0;
  img {
    opacity: 1;
  }
  img,
  canvas {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  canvas {
    height: 100%;
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

const CarouselWrapper = styled.div`
  position: relative;
  margin: 1em;
  :focus {
    outline: 0;
  }
  &.show-false {
    display: none;
  }
  .carousel-cell {
    width: 25%;
    height: 300px;
    background: red;
    margin: 0.5em;
  }
`;
