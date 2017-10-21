// @flow

import "babel-polyfill";
import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";

import { App } from "@src/components/App";
import { makeStore, reducer } from "@src/store";

const globalStore = makeStore();

const renderApp = () => {
  const elem = (
    <Provider store={globalStore}>
      <App />
    </Provider>
  );
  ReactDOM.render(elem, document.getElementById("root"));
};

renderApp();

if (module.hot) {
  const mhr = (module.hot: any);
  mhr.accept(undefined, renderApp);
  mhr.accept("./store", () => {
    globalStore.replaceReducer(reducer);
  });
}
