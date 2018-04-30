// @flow

import { applyMiddleware, createStore, compose } from "redux";

import * as Types from "@src/types";

import Callable from "callable-class";

type Ops = {
  dispatch: <B>((Ops => B) | { type: string }) => B,
  getState: () => Types.State
};

export class ActionCreator<A, B> extends Callable<A, (Ops) => B> {
  toFinish: ?Promise<B>;
  constructor(f: A => Ops => B) {
    super(x => ops => {
      const y = f(x)(ops);
      if (y && typeof (y: any).then === "function") (this: any).toFinish = y;

      return y;
    });
  }
}

export type WithDispatch<A: {}> = {
  ...$Exact<A>,
  dispatch: <B>((Ops => B) | { type: string }) => B
};

export const setState = (state: Types.State) => ({
  type: "setState",
  payload: state
});

export const modifyState = (f: Types.State => Types.State) => ({
  type: "modifyState",
  payload: f
});

export const reducer = (state: Types.State, action: any) => {
  if (action.type === "setState") return action.payload;
  else if (action.type === "modifyState") return action.payload(state);

  return state;
};

const safeThunk = store => next => action => {
  if (typeof action === "function") return action(store);

  return next(action);
};

const defaultState: Types.State = {
  work: {},
  sections: {},
  selectedProject: null,
  selectedGroupId: null,
  selectedProjectId: null,
  selectedGallery: null,
  selectedGalleryItem: null,
  bio: { link: "", content: "" },
  lists: {},
  viewsource: "",
  frameRate: 25,
  initialRoute: ""
};

const enhancer = compose(
  applyMiddleware(safeThunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

export const makeStore = () => createStore(reducer, defaultState, enhancer);
