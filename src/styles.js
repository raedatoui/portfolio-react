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
`;
