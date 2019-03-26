import { createElement, Component } from 'react';

import IO from './IO';
import Scroll from './Scroll';
import { intersectionObserverSupported } from './peekaboo';
import { defaultProps, Props } from './types';

export { IO, Props, Scroll };

export class InView extends Component<Props> {
  static defaultProps = defaultProps;

  render() {
    if (!intersectionObserverSupported()) {
      return createElement(Scroll, this.props);
    }

    return createElement(IO, this.props);
  }
}
