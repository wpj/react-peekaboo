import { Component } from 'react';

import { defaultProps, Omit, Props as SharedProps, Ref } from './types';
import { io, TeardownFunc } from './peekaboo';

type IOProps = Omit<SharedProps, 'throttle'>;

type State = {
  element: Element | null;
};

export default class IO extends Component<IOProps, State> {
  static defaultProps = defaultProps;

  state: State = {
    element: null,
  };

  // Use a callback ref instead of a ref object so we know if the child
  // performs a stateful update and changes the underlying node.
  childRef: Ref = element => {
    this.setState({ element });
  };

  teardown: TeardownFunc | null = null;

  setup = () => {
    if (this.props.enabled && this.state.element) {
      const { offsetBottom, offsetTop, onChange } = this.props;

      this.teardown = io({
        element: this.state.element,
        offsetBottom,
        offsetTop,
        onChange,
      });
    }
  };

  safeTeardown = () => {
    if (this.teardown) {
      this.teardown();
      this.teardown = null;
    }
  };

  componentDidUpdate(prevProps: IOProps, prevState: State) {
    if (
      prevProps.children !== this.props.children ||
      prevProps.enabled !== this.props.enabled ||
      prevProps.offsetBottom !== this.props.offsetBottom ||
      prevProps.offsetTop !== this.props.offsetTop ||
      prevProps.onChange !== this.props.onChange ||
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
