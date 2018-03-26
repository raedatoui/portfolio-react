// @flow

import "babel-polyfill";
import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";

import { App } from "@src/components/App";
import { makeStore, reducer } from "@src/store";

const noop = () => {};

const globalStore = makeStore();

const loadYTScripts = (YT: {}, YTConfig: {}) => {
  let l = [];
  // $FlowFixMe
  YT.ready = function(f) {
    // $FlowFixMe
    if (YT.loaded) {
      f();
    } else {
      l.push(f);
    }
  };
  window.onYTReady = function() {
    // $FlowFixMe
    YT.loaded = 1;
    for (let i = 0; i < l.length; i++) {
      try {
        l[i]();
      } catch (e) {
        noop();
      }
    }
  };
  // $FlowFixMe
  YT.setConfig = function(c) {
    for (var k in c) {
      if (c.hasOwnProperty(k)) {
        YTConfig[k] = c[k];
      }
    }
  };
  let a = document.createElement("script");
  a.type = "text/javascript";
  a.id = "www-widgetapi-script";
  a.src =
    "https://s.ytimg.com/yts/jsbin/www-widgetapi-vflOozvUR/www-widgetapi.js";
  a.async = true;
  let b = document.getElementsByTagName("script")[0];
  if (b.parentNode) b.parentNode.insertBefore(a, b);
};

const loadYT = () => {
  let YT = window["YT"];
  let YTConfig = window["YTConfig"];
  if (!YT) {
    YT = {
      loading: 0,
      loaded: 0
    };
  }

  if (!YTConfig) {
    YTConfig = {
      host: "http://www.youtube.com"
    };
  }

  if (!YT.loading) {
    YT.loading = 1;
    loadYTScripts(YT, YTConfig);
  }
};

const renderApp = () => {
  const elem = (
    <Provider store={globalStore}>
      <App />
    </Provider>
  );
  const container = document.getElementById("root");
  if (container !== null) ReactDOM.render(elem, container);
};

window.onYouTubeIframeAPIReady = () => {
  renderApp();
};

loadYT();

// $FlowFixMe
if (module.hot) {
  const mhr = (module.hot: any);
  mhr.accept(undefined, renderApp);
  mhr.accept("./store", () => {
    globalStore.replaceReducer(reducer);
  });
}
