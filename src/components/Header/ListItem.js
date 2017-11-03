// @flow

import React from "react";
import styled from "styled-components";

type OwnProps = {
  name: string,
  link: ?string,
  index: number
};

class HeaderListItem extends React.Component<OwnProps> {
  fx: ?HTMLAudioElement;

  render() {
    return (
      <ListItem
        onMouseEnter={() => (this.fx ? this.fx.play() : false)}
        onMouseLeaver={() => (this.fx ? this.fx.play() : false)}
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
        <a href={this.props.link} target="_blank">
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
  height: 24px;
  &:hover {
    transform: rotateY(-180deg);
    transform-origin: 50%, 50%;
    backface-visibility: visible;
  }
  img {
    width: 24px;
  }
`;

export default HeaderListItem;
