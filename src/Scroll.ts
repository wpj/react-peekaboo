import { createRef, Component } from 'react';

import { Props } from './types';
import { scroll, TeardownFunc } from './peekaboo';

export default class Scroll extends Component<Props> {
  static defaultProps = {
    offsetBottom: 0,
    offsetTop: 0,
    throttle: 100,
  };

  childRef = createRef<Element>();

  teardown?: TeardownFunc;

  componentDidMount() {
    if (this.childRef.current) {
      const { offsetBottom, offsetTop, onChange, throttle } = this.props;

      this.teardown = scroll({
        offsetBottom,
        offsetTop,
        onChange,
        element: this.childRef.current,
        throttle,
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
