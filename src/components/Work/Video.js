// @flow

import React from "react";
import Player from "@vimeo/player";
import styled from "styled-components";
import * as Types from "@src/types";

type Props = {|
  item: Types.GalleryItem
|};

export default class VideoPlayer extends React.Component<Props> {
  videoContainer: HTMLDivElement;
  vimeoPlayer: Player;
  // $FlowFixMe
  ytPlayer: YT.Player;

  pause() {
    if (this.vimeoPlayer) this.vimeoPlayer.pause();
    if (this.ytPlayer) this.ytPlayer.pauseVideo();
  }

  componentDidMount() {
    const { type, asset, width, height } = this.props.item;
    if (type === "vimeo")
      this.vimeoPlayer = new Player(asset, {
        id: asset,
        width: 1280
      });
    else
      this.ytPlayer = new YT.Player(asset, {
        id: asset,
        width: width,
        height: height,
        videoId: asset
      });
  }

  componentWillUnmount() {
    if (this.vimeoPlayer) this.vimeoPlayer.unload();
    if (this.ytPlayer) this.ytPlayer.destroy();
  }

  render() {
    return (
      <VideoWrapper>
        <div
          id={this.props.item.asset}
          ref={ref => {
            if (ref) this.videoContainer = ref;
          }}
        />
      </VideoWrapper>
    );
  }
}

const VideoWrapper = styled.div`
  overflow: hidden;
  padding-bottom: 56.25%;
  position: relative;
  height: 0;
  iframe {
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    position: absolute;
  }
`;
