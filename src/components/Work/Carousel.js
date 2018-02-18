// @flow

import React from "react";
import styled from "styled-components";
import Flickity from "flickity";
import * as Types from "@src/types";
import { colors } from "@src/styles";
import VimeoPlayer from "./Vimeo";

type Props = {|
  gallery: Types.Gallery,
  selectedItem: number,
  projectId: string,
  galleryFn: Function
|};

export default class Carousel extends React.Component<Props> {
  slider: Flickity;
  videos: Array<VimeoPlayer>;

  constructor(props: Props) {
    super(props);
    this.videos = [];
  }

  componentDidMount() {
    this.slider = new Flickity(".carousel", {
      pageDots: false,
      wrapAround: true,
      initialIndex: this.props.selectedItem
    });
    this.slider.on("select", () => {
      const slide = this.props.gallery[this.slider.selectedIndex];
      let currentPlayer;
      if (slide.type === "vimeo" && slide.asset)
        currentPlayer = this.getPlayerByVideoId(slide.asset);
      this.videos.forEach(elem => {
        if (elem !== currentPlayer) elem.player.pause();
      });
    });
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
    this.slider.destroy();
  }

  getPlayerByVideoId(videoId: string): ?VimeoPlayer {
    return this.videos.find(elem => elem.props.videoId === videoId);
  }

  updateDimensions = () => {
    this.slider.resize();
  };

  render() {
    const { gallery, projectId, galleryFn } = this.props;
    return (
      <CarouselContainer>
        <SourceLink>
          <CloseButton onClick={() => galleryFn()}>( close )</CloseButton>
        </SourceLink>
        <CarouselWrapper className="carousel">
          {gallery.map((item, idx) => {
            return (
              <Cell key={`gallery-${idx}`} className="cell">
                {item.type === "image" && (
                  <img
                    src={`/content/images/projects/${projectId}/${item.image}`}
                    alt={item.caption}
                  />
                )}
                {item.type === "vimeo" &&
                  item.asset && (
                    <VimeoPlayer
                      videoId={item.asset}
                      ref={ref => {
                        if (ref) this.videos.push(ref);
                      }}
                    />
                  )}
              </Cell>
            );
          })}
        </CarouselWrapper>
      </CarouselContainer>
    );
  }
}

const CarouselContainer = styled.div`
  background: white;
  width: 100%;
  z-index: 10;
  .flickity-slider {
    display: flex;
    align-items: center;
  }
`;

const SourceLink = styled.div`
  margin: 0.75em -1em 0 -1em;
  display: inline-flex;
  justify-content: flex-end;
  width: 100%;
  text-align: right;
  &:visited {
    color: ${colors.red};
  }
`;

const CloseButton = styled.span`
  cursor: pointer;
  color: ${colors.grey};
  &:hover {
    color: ${colors.red};
    text-decoration: underline;
  }
`;

const CarouselWrapper = styled.div``;

const Cell = styled.div`
  width: 100%;
  img {
    width: 100%;
  }
`;
