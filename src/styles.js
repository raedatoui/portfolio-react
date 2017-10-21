// @flow
import { css } from "styled-components";

export const Card = (h: number = 1) => css`
    box-shadow: 0 ${h}px ${h * 3}px rgba(0,0,0,${h * 0.12}), 0 ${h}px ${2 *
  h}px rgba(0,0,0,0.24);
    }
  `;

export const colors = {
  lightGrey: "#f5f6f7",
  grey: "#aaaaaa",
  blue: "#0288d1",
  white: "#ffffff",
  black: "#000000"
};
