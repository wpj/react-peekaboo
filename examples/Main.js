import React, { Component } from 'react';

import { Provider, Consumer } from '../src';

const urls = [...Array(5).keys()].map(i => `/${i}`);

export default class Main extends Component {
  render() {
    return (
      <Provider>
        {({ ref: providerRef, onScroll }) => {
          return (
            <div
              onScroll={onScroll}
              css={`
                height: 100vh;
                overflow: auto;
              `}
              ref={providerRef}
            >
              {urls.map(url => (
                <Consumer key={url}>
                  {({ ref: childRef, isInViewport }) => {
                    const inViewText = `${url} in viewport: ${isInViewport}`;
                    return (
                      <div
                        css={`
                          margin: 1em;
                          height: 80vh;
                          background-color: goldenrod;
                          position: relative;
                        `}
                        ref={childRef}
                      >
                        <div
                          css={`
                            position: absolute;
                            top: 0;
                          `}
                        >
                          {inViewText}
                        </div>
                        <div
                          css={`
                            position: absolute;
                            bottom: 0;
                          `}
                        >
                          {inViewText}
                        </div>
                      </div>
                    );
                  }}
                </Consumer>
              ))}
            </div>
          );
        }}
      </Provider>
    );
  }
}
