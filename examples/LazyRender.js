/** @jsx jsx */

import { css, jsx } from '@emotion/core';
import React, { Component } from 'react';

import { Provider, Consumer } from '../src';

const urls = [...Array(5).keys()].map(i => `/${i}`);

class LazyRenderOnce extends Component {
  static defaultProps = {
    shouldRender: false,
  };

  static getDerivedStateFromProps(props, state) {
    if (state.shouldRender) {
      return state;
    }

    return {
      shouldRender: props.shouldRender,
    };
  }

  state = {
    shouldRender: false,
  };

  render() {
    const { shouldRender } = this.state;

    console.log('shouldRender:', shouldRender);

    if (!shouldRender) {
      return null;
    }

    return this.props.children;
  }
}

class Lazy extends Component {
  render() {
    const { children } = this.props;

    return (
      <Consumer>
        {({ ref, isInViewport }) => {
          return (
            <div
              css={css`
                background-color: magenta;
                height: 110vh;
              `}
              ref={ref}
            >
              <LazyRenderOnce shouldRender={isInViewport}>
                {children}
              </LazyRenderOnce>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default class LazyRenderExample extends Component {
  render() {
    return (
      <Provider>
        {({ ref: providerRef, onScroll }) => {
          return (
            <div
              onScroll={onScroll}
              css={css`
                height: 100vh;
                overflow: auto;
              `}
              ref={providerRef}
            >
              {urls.map((url, index) => (
                <div key={url}>
                  <div
                    css={css`
                      margin: 1em;
                      height: 80vh;
                      background-color: goldenrod;
                      position: relative;
                    `}
                  >
                    <div
                      css={css`
                        position: absolute;
                        top: 0;
                      `}
                    >
                      {url}
                      <Lazy>
                        <img
                          src={`http://lorempixel.com/400/200/sports/Image-${index}/`}
                        />
                      </Lazy>
                    </div>
                    <div
                      css={css`
                        position: absolute;
                        bottom: 0;
                      `}
                    >
                      {url}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          );
        }}
      </Provider>
    );
  }
}
