// @flow

import React from "react";
import styled from "styled-components";
import { breakSm, breakMd, breakLg } from "@src/styles";

type OwnProps = {
  name: string,
  link: ?string,
  index: number,
  muted: boolean
};

class HeaderListItem extends React.Component<OwnProps> {
  fx: ?HTMLAudioElement;

  playFx() {
    if (this.fx) {
      window.gtag("send", "event", "fart", this.props.name);
      // $FlowFixMe
      this.fx.play();
    }
  }
  onClick() {
    window.gtag("send", "event", "net", this.props.name);
  }

  render() {
    if (this.fx) this.fx.volume = this.props.muted ? 0 : 1;
    return (
      <ListItem
        onClick={() => this.onClick()}
        onBlur={() => this.playFx()}
        onFocus={() => this.playFx()}
        onMouseEnter={() => this.playFx()}
      >
        <audio
          controls={false}
          preload="auto"
          ref={ref => {
            this.fx = ref;
          }}
        >
          <source src={`/assets/audio/fart${this.props.index + 1}.ogg`} />
          <p>
            Your browser does not support the <code>audio</code> element.
          </p>
        </audio>
        <a href={this.props.link} target="_blank" rel="noreferrer">
          <img
            alt={this.props.name}
            src={`/assets/images/header/${this.props.name}.png`}
          />
        </a>
      </ListItem>
    );
  }
}

const ListItem = styled.li`
  margin: 0 2px;
  transition: 0.25s all;
  &:hover {
    transform: rotateY(-180deg);
    transform-origin: 50%, 50%;
    backface-visibility: visible;
  }
  @media (${breakSm}) {
    width: 20px;
    height: 20px;
    img {
      width: 20px;
      height: 20px;
    }
  }
  @media (${breakMd}) {
    width: 22px;
    height: 22px;
    img {
      width: 22px;
      height: 22px;
    }
  }
  @media (${breakLg}) {
    width: 24px;
    height: 24px;
    img {
      width: 24px;
      height: 24px;
    }
  }
`;

export default HeaderListItem;
