// @flow
import React from "react";
import Player from "@vimeo/player";
import styled from "styled-components";

type Props = {|
  videoId: string
|};

export default class VimeoPlayer extends React.Component<Props> {
  videoContainer: HTMLDivElement;
  player: Player;

  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    this.player = new Player(this.props.videoId, {
      id: this.props.videoId,
      width: 1280
    });
  }

  componentWillUnmount() {
    this.player.unload();
  }

  render() {
    return (
      <VimeoContainer
        id={this.props.videoId}
        ref={ref => {
          if (ref) this.videoContainer = ref;
        }}
      />
    );
  }
}

const VimeoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
