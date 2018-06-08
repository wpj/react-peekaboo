import React, { Component } from 'react';

import { Consumer as ContextConsumer } from '../context';
import Observer from './Observer';
import Scroll from './Scroll';

export default class Visible extends Component {
  render() {
    return (
      <ContextConsumer>
        {({ useObserver, ...api }) => {
          return useObserver ? (
            <Observer {...api}>{this.props.children}</Observer>
          ) : (
            <Scroll {...api}>{this.props.children}</Scroll>
          );
        }}
      </ContextConsumer>
    );
  }
}
