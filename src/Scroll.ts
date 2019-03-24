import { Component } from 'react';

import { Props, Ref } from './types';
import { scroll, TeardownFunc } from './peekaboo';

type ScrollProps = Props;

type State = {
  element: Element | null;
};

export default class Scroll extends Component<ScrollProps, State> {
  static defaultProps = {
    offsetBottom: 0,
    offsetTop: 0,
    throttle: 100,
  };

  state: State = {
    element: null,
  };

  // Use a callback ref instead of a ref object so we know if the child
  // performs a stateful update and changes the underlying node.
  childRef: Ref = element => {
    this.setState({ element });
  };

  teardown?: TeardownFunc;

  setup = () => {
    if (this.state.element) {
      const { offsetBottom, offsetTop, onChange, throttle } = this.props;

      this.teardown = scroll({
        offsetBottom,
        offsetTop,
        onChange,
        element: this.state.element,
        throttle,
      });
    }
  };

  safeTeardown = () => {
    if (this.teardown) {
      this.teardown();
    }
  };

  componentDidUpdate(prevProps: ScrollProps, prevState: State) {
    if (
      prevProps.children !== this.props.children ||
      prevProps.offsetBottom !== this.props.offsetTop ||
      prevProps.offsetTop !== this.props.offsetTop ||
      prevProps.onChange !== this.props.onChange ||
      prevProps.throttle !== this.props.throttle ||
      prevState.element !== this.state.element
    ) {
      this.safeTeardown();
      this.setup();
    }
  }

  componentWillUnmount() {
    this.safeTeardown();
  }

  render() {
    return this.props.children(this.childRef);
  }
}
