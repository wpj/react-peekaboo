import { createElement, FunctionComponent } from 'react';

import IO from './IO';
import Scroll from './Scroll';
import { intersectionObserverSupported } from './peekaboo';
import { Props } from './types';

export { IO, Props, Scroll };

export const InView: FunctionComponent<Props> = props => {
  if (!intersectionObserverSupported()) {
    return createElement(Scroll, props);
  }

  return createElement(IO, props);
};
