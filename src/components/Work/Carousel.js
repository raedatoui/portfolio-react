// @flow

import React from "react";
import styled from "styled-components";
import Flickity from "flickity";
import * as Types from "@src/types";
import { colors } from "@src/styles";
import VideoPlayer from "./Video";

type Props = {|
  gallery: Types.Gallery,
  selectedItem: number,
  projectId: string,
  galleryFn: Function
|};

export default class Carousel extends React.Component<Props> {
  slider: Flickity;
  videos: Array<VideoPlayer>;

  constructor(props: Props) {
    super(props);
    this.videos = [];
  }

  componentDidMount() {
    this.slider = new Flickity(".carousel", {
      pageDots: false,
      wrapAround: true,
      adaptiveHeight: true,
      initialIndex: this.props.selectedItem
    });

    this.slider.on("select", () => {
      const slide = this.props.gallery[this.slider.selectedIndex];
      let currentVideo: ?VideoPlayer;
      if (slide.type === "vimeo" && slide.asset)
        currentVideo = this.getPlayerByVideoId(slide.asset);
      this.videos.forEach(video => {
        if (video !== currentVideo) video.pause();
      });
    });

    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
    this.slider.destroy();
  }

  getPlayerByVideoId(videoId: string): ?VideoPlayer {
    return this.videos.find(elem => elem.props.item.asset === videoId);
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
                {(item.type === "vimeo" || item.type === "youtube") &&
                  item.asset && (
                    <VideoPlayer
                      item={item}
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
  margin-top: 0.5rem;
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
  font-size: 0.75rem;
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
    max-height: 1080px;
  }
`;
