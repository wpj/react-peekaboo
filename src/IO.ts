import { createRef, Component } from 'react';

import { Omit, Props } from './types';
import { io, TeardownFunc } from './peekaboo';

export default class IO extends Component<Omit<Props, 'throttle'>> {
  static defaultProps = {
    offsetBottom: 0,
    offsetTop: 0,
  };

  childRef = createRef<Element>();

  teardown?: TeardownFunc;

  componentDidMount() {
    if (this.childRef.current) {
      const { offsetBottom, offsetTop, onChange } = this.props;

      this.teardown = io({
        element: this.childRef.current,
        offsetBottom,
        offsetTop,
        onChange,
      });
    }
  }

  componentWillUnmount() {
    if (this.teardown) {
      this.teardown();
    }
  }

  render() {
    return this.props.children(this.childRef);
  }
}
