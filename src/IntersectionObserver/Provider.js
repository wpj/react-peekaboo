import React, { createRef, Component } from 'react';
import { number, string, object, oneOfType, arrayOf } from 'prop-types';

import { Provider as ContextProvider, DEFAULT_STATE } from './context';

export default class Provider extends Component {
  static propTypes = {
    threshold: oneOfType([number, arrayOf(number)]),
    rootMargin: string,
    root: object,
  };

  static defaultProps = {
    threshold: 0,
  };

  state = DEFAULT_STATE;

  containerRef = createRef();

  updateObservedEntries = changes => {
    this.setState({ changes });
  };

  componentDidMount = () => {
    const { threshold, rootMargin } = this.props;

    const observer = new IntersectionObserver(this.updateObservedEntries, {
      threshold,
      rootMargin,
      root: this.containerRef.current || null,
    });

    this.setState({
      useObserver: true,
      observe: observer.observe.bind(observer),
      unobserve: observer.unobserve.bind(observer),
    });
  };

  render() {
    return (
      <ContextProvider value={this.state}>
        {this.props.children({ ref: this.containerRef })}
      </ContextProvider>
    );
  }
}
