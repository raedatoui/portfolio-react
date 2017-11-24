// @flow
import styled, { css, injectGlobal } from "styled-components";

export const Card = (h: number = 1) => css`
    box-shadow: 0 ${h}px ${h * 3}px rgba(0,0,0,${h * 0.12}), 0 ${h}px ${2 *
  h}px rgba(0,0,0,0.24);
    }
  `;

export const colors = {
  grey: "#444444",
  red: "#EE4938",
  white: "#ffffff",
  reda: "rgba(238, 73, 56, 0.25)"
};

export const copy = styled.div`
  font-size: 1.414em;
  line-height: 1.6968em;
`;

injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
    margin: 0;
    background-color: ${colors.white};
    color:  ${colors.grey};
    font-weight: 400;
    font: normal 100%/1.4 'Work Sans', sans-serif;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
  }
  
  h1, h2, h3, h4 {
    font-weight: inherit;
    line-height: 1.2;
  }
  
  h1 {
    margin-top: 0;
    font-size: 3.998em;
    font-weight: 600;
  }
  
  h2 {
    font-size: 2.827em;
    font-weight: 600;
  }
  
  h3 {
    font-size: 1.999em;
    font-weight: 500;
  }
  
  h4 {font-size: 1.414em;}

  p {
    font-size: 1.414em;
    line-height: 1.6968em;
  }
    
  small, .font_small {font-size: 0.707em;}

  a {
    text-decoration: none;
    &:visited {
      color: ${colors.grey};
    }
    &:hover {
      color: ${colors.red};
      text-decoration: underline;
    }
    &:focus {
      outline: 1px dotted ${colors.red};
    }
  }
   
  #root {
    padding: 0em;
  }
  
  ::selection { background: ${colors.red}; color:${colors.white}; text-shadow: none; }
  
  /*! Flickity v2.0.10
  http://flickity.metafizzy.co
  ---------------------------------------------- */
  
  .flickity-enabled {
    position: relative;
  }
  
  .flickity-enabled:focus { outline: none; }
  
  .flickity-viewport {
    overflow: hidden;
    position: relative;
    height: 100%;
  }
  
  .flickity-slider {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  
  /* draggable */
  
  .flickity-enabled.is-draggable {
    -webkit-tap-highlight-color: transparent;
            tap-highlight-color: transparent;
    -webkit-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
  }
  
  .flickity-enabled.is-draggable .flickity-viewport {
    cursor: move;
    cursor: -webkit-grab;
    cursor: grab;
  }
  
  .flickity-enabled.is-draggable .flickity-viewport.is-pointer-down {
    cursor: -webkit-grabbing;
    cursor: grabbing;
  }
  
  /* ---- previous/next buttons ---- */
  
  .flickity-prev-next-button {
    position: absolute;
    top: 50%;
    margin-top: -22px;
    width: 44px;
    height: 44px;
    border: none;
    border-radius: 50%;
    background: white;
    background: hsla(0, 0%, 100%, 0.75);
    cursor: pointer;
    /* vertically center */
    -webkit-transform: translateY(-50%);
            transform: translateY(-50%);
  }
  
  .flickity-prev-next-button:hover { background: white; }
  
  .flickity-prev-next-button:focus {
    outline: none;
    box-shadow: 0 0 0 5px #09F;
  }
  
  .flickity-prev-next-button:active {
    opacity: 0.6;
  }
  
  .flickity-prev-next-button.previous { left: 10px; }
  .flickity-prev-next-button.next { right: 10px; }
  /* right to left */
  .flickity-rtl .flickity-prev-next-button.previous {
    left: auto;
    right: 10px;
  }
  .flickity-rtl .flickity-prev-next-button.next {
    right: auto;
    left: 10px;
  }
  
  .flickity-prev-next-button:disabled {
    opacity: 0.3;
    cursor: auto;
  }
  
  .flickity-prev-next-button svg {
    position: absolute;
    left: 20%;
    top: 20%;
    width: 60%;
    height: 60%;
  }
  
  .flickity-prev-next-button .arrow {
    fill: #333;
  }
  
  /* ---- page dots ---- */
  
  .flickity-page-dots {
    position: absolute;
    width: 100%;
    bottom: -25px;
    padding: 0;
    margin: 0;
    list-style: none;
    text-align: center;
    line-height: 1;
  }
  
  .flickity-rtl .flickity-page-dots { direction: rtl; }
  
  .flickity-page-dots .dot {
    display: inline-block;
    width: 10px;
    height: 10px;
    margin: 0 8px;
    background: #333;
    border-radius: 50%;
    opacity: 0.25;
    cursor: pointer;
  }
  
  .flickity-page-dots .dot.is-selected {
    opacity: 1;
  }  
  
`;
