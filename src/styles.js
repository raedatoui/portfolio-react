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
  darkRed: "#AD3529",
  white: "#ffffff",
  lightGrey: "#d7dcdf",
  reda: "rgba(238, 73, 56, 0.25)"
};

export const copy = styled.div``;

// const baseline = "1.5rem";

// const minScreen = "20rem";
// const maxScreen = "50rem";
// const minFont = ".8rem";
// const maxFont = "2rem";

// const h1 = "2rem";
// const h2 = "1.5rem";
// const h3 = "1.25rem";
// const h4 = "1rem";
// const h5 = ".875rem";

injectGlobal`
* {
  box-sizing: border-box;
  font-weight: 400;
}

html {
  box-sizing: border-box;
  height: 100%;
  font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  font-size: 0.8rem;
}

@media screen and (min-width: 20rem) {
  html {
    font-size: calc(0.8rem + 1.0 * ((100vw - 20rem) / 80));
  }
}
@media screen and (min-width: 100rem) {
  html {
    font-size: 2rem;
  }
}

html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
  background-color: ${colors.white};
  color: ${colors.grey};
  font-family: 'Work Sans', sans-serif; 
  line-height: 1.5rem;   
}


pre {
  font-size: 12px;
  padding: 10px;
  background: white;
  border: solid 1px #777;
}

table {
  border-collapse: collapse;
  border-spacing: 0px;
  border: 1px solid #666;
}

td, th {
  padding: 0.25rem .5rem;
  border: 1px solid #666;
}

span {
  line-height: 1.5rem;
}

p {
  line-height: 1.5rem;
  margin-bottom: 1.5rem;
}

h1,
h2,
h3,
h4,
h5 {
  margin-bottom: 1.5rem;
}

h1 {
  font-size: 2rem;
  line-height: 2rem;
  margin-top: calc((1.5rem - 2rem) + 1.5rem);
  font-weight: 600;
}

h2 {
  font-size: 1.5rem;
  line-height: 1.5rem;
  margin-top: calc((1.5rem - 1.5rem) + 1.5rem*2);
  font-weight: 600;
}

h3 {
  font-size: 1.25rem;
  line-height: 1.25rem;
  margin-top: calc((1.5rem - 1.25rem) + 1.5rem*2);
  font-weight: 500;
}

h4 {
  font-size: 1rem;
  line-height: 1rem;
  margin-top: calc((1.5rem - 1rem) + 1.5rem*2);
}

h5 {
  font-size: 0.875rem;
  line-height: 0.875rem;
  margin-top: calc((1.5rem - 0.875rem) + 1.5rem*2);
}
ul {
  padding-left: 1rem;
}

a {
  color: ${colors.darkRed};
  text-decoration: none;
  &:visited {
    color: ${colors.darkRed};
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

.Grid {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
}

.Grid-cell {
  flex: 1;
}

.Grid--flexCells > .Grid-cell {
  display: flex;
}

.Grid--top {
  align-items: flex-start;
}

.Grid--bottom {
  align-items: flex-end;
}

.Grid--center {
  align-items: center;
}

.Grid--justifyCenter {
  justify-content: center;
}

.Grid-cell--top {
  align-self: flex-start;
}

.Grid-cell--bottom {
  align-self: flex-end;
}

.Grid-cell--center {
  align-self: center;
}

.Grid-cell--autoSize {
  flex: none;
}

.Grid--fit > .Grid-cell {
  flex: 1;
}

.Grid--full > .Grid-cell {
  flex: 0 0 100%;
}

.Grid--1of2 > .Grid-cell {
  flex: 0 0 50%;
}

.Grid--1of3 > .Grid-cell {
  flex: 0 0 33.3333%;
}

.Grid--1of4 > .Grid-cell {
  flex: 0 0 25%;
}

@media (--break-sm) {
  .small-Grid--fit > .Grid-cell {
    flex: 1;
  }
  .small-Grid--full > .Grid-cell {
    flex: 0 0 100%;
  }
  .small-Grid--1of2 > .Grid-cell {
    flex: 0 0 50%;
  }
  .small-Grid--1of3 > .Grid-cell {
    flex: 0 0 33.3333%;
  }
  .small-Grid--1of4 > .Grid-cell {
    flex: 0 0 25%;
  }
}

@media (--break-md) {
  .med-Grid--fit > .Grid-cell {
    flex: 1;
  }
  .med-Grid--full > .Grid-cell {
    flex: 0 0 100%;
  }
  .med-Grid--1of2 > .Grid-cell {
    flex: 0 0 50%;
  }
  .med-Grid--1of3 > .Grid-cell {
    flex: 0 0 33.3333%;
  }
  .med-Grid--1of4 > .Grid-cell {
    flex: 0 0 25%;
  }
}

@media (--break-lg) {
  .large-Grid--fit > .Grid-cell {
    flex: 1;
  }
  .large-Grid--full > .Grid-cell {
    flex: 0 0 100%;
  }
  .large-Grid--1of2 > .Grid-cell {
    flex: 0 0 50%;
  }
  .large-Grid--1of3 > .Grid-cell {
    flex: 0 0 33.3333%;
  }
  .large-Grid--1of4 > .Grid-cell {
    flex: 0 0 25%;
  }
}

.Grid--gutters {
  margin: -1em 0 1em -1em;
}
.Grid--gutters > .Grid-cell {
  padding: 1em 0 0 1em;
}

.Grid--guttersLg {
  margin: -1.5em 0 1.5em -1.5em;
}
.Grid--guttersLg > .Grid-cell {
  padding: 1.5em 0 0 1.5em;
}

.Grid--guttersXl {
  margin: -2em 0 2em -2em;
}
.Grid--guttersXl > .Grid-cell {
  padding: 2em 0 0 2em;
}

@media (--break-sm) {
  .small-Grid--gutters {
    margin: -1em 0 1em -1em;
  }
  .small-Grid--gutters > .Grid-cell {
    padding: 1em 0 0 1em;
  }
  .small-Grid--guttersLg {
    margin: -1.5em 0 1.5em -1.5em;
  }
  .small-Grid--guttersLg > .Grid-cell {
    padding: 1.5em 0 0 1.5em;
  }
  .small-Grid--guttersXl {
    margin: -2em 0 2em -2em;
  }
  .small-Grid--guttersXl > .Grid-cell {
    padding: 2em 0 0 2em;
  }
}

@media (--break-md) {
  .med-Grid--gutters {
    margin: -1em 0 1em -1em;
  }
  .med-Grid--gutters > .Grid-cell {
    padding: 1em 0 0 1em;
  }
  .med-Grid--guttersLg {
    margin: -1.5em 0 1.5em -1.5em;
  }
  .med-Grid--guttersLg > .Grid-cell {
    padding: 1.5em 0 0 1.5em;
  }
  .med-Grid--guttersXl {
    margin: -2em 0 2em -2em;
  }
  .med-Grid--guttersXl > .Grid-cell {
    padding: 2em 0 0 2em;
  }
}

@media (--break-lg) {
  .large-Grid--gutters {
    margin: -1em 0 1em -1em;
  }
  .large-Grid--gutters > .Grid-cell {
    padding: 1em 0 0 1em;
  }
  .large-Grid--guttersLg {
    margin: -1.5em 0 1.5em -1.5em;
  }
  .large-Grid--guttersLg > .Grid-cell {
    padding: 1.5em 0 0 1.5em;
  }
  .large-Grid--guttersXl {
    margin: -2em 0 2em -2em;
  }
  .large-Grid--guttersXl > .Grid-cell {
    padding: 2em 0 0 2em;
  }
}
   
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
