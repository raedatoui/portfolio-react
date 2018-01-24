// @flow

import React from "react";
import styled from "styled-components";
import Flickity from "flickity";
import * as Types from "@src/types";
import { colors } from "@src/styles";

type Props = {|
  gallery: Types.Gallery,
  projectId: string,
  galleryFn: Function
|};

export default class Carousel extends React.Component<Props> {
  slider: Flickity;

  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    if (document.body) document.body.style.overflow = "hidden";
    this.slider = new Flickity(".carousel", {
      pageDots: false
    });
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    if (document.body) document.body.style.overflow = "inherit";
    this.slider.destroy();
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
                    src={`/content/images/projects/${projectId}/${item.asset}`}
                    alt={item.caption}
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
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  .flickity-slider {
    display: flex;
    align-items: center;
    .cell {
      background: #ddd;
      img {
        opacity: 0.5;
      }
      &.is-selected {
        background: black;
        img {
          opacity: 1;
        }
      }
    }
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

const Cell = styled.div``;
