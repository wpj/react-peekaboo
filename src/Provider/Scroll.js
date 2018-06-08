import React, { createRef, Component } from 'react';
import { debounce, throttle } from 'lodash';

import { Provider as ContextProvider, DEFAULT_STATE } from '../context';

export default class Scroll extends Component {
  childRef = createRef();

  state = DEFAULT_STATE;

  handleScroll = throttle(() => {
    this.setState({ counter: this.state.counter + 1 });
  }, 500);

  render() {
    return (
      <ContextProvider value={this.state}>
        {this.props.children({
          ref: this.childRef,
          onScroll: this.handleScroll,
        })}
      </ContextProvider>
    );
  }
}
