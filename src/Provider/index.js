import React, { Component } from 'react';

import Observer from './Observer';
import Scroll from './Scroll';

const intersectionObserverSupported =
  typeof window !== 'undefined' && 'IntersectionObserver' in window;

export default class Provider extends Component {
  render() {
    return intersectionObserverSupported ? (
      <Observer {...this.props} />
    ) : (
      <Scroll {...this.props} />
    );
  }
}
