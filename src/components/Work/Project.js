// @flow

import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import Flickity from "flickity";
import type { WithDispatch } from "@src/store";
import * as Types from "@src/types";
import * as ProjectActions from "./actions";
import { copy, colors } from "@src/styles";
import { Text } from "@src/components/Shared";
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

  componentDidUpdate(prevProps: WithDispatch<OwnProps>): void {
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
    const headerClass = (showPixels || showDetails).toString();
    return (
      <Project
        id={projectId}
        tabIndex="0"
        onBlur={this.handleMouseOut}
        onFocus={this.handleMouseOver}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
        className="Grid-cells"
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
          className={`carousel carousel-${projectId} show-${showDetails.toString()}`}
        >
          <div className="carousel-cell" />
          <div className="carousel-cell" />
          <div className="carousel-cell" />
          <div className="carousel-cell" />
          <div className="carousel-cell" />
        </CarouselWrapper>
        {/*<hr />*/}
      </Project>
    );
  }
}

export default connect(mapStateToProps)(ProjectInner);

const Project = styled.div`
  width: calc(25% - 2em);
  margin: 1em;
  hr {
    height: 1px;
    border: none;
    background-color: #ddd;
    margin: 0.61em 0;
  }
  &:focus {
    outline: 2px solid ${colors.red};
  }
`;

const Card = styled.div`width: 100%;`;

const Header = styled.h4`
  text-align: center;
  border-top: 1px solid #ccc;
  padding: 0.5em;
  visibility: hidden;
  span {
    cursor: pointer;
  }
  &:hover {
    color: ${colors.red};
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
