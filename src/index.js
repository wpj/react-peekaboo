import React from 'react';

import IntersectionObserverProvider from './IntersectionObserver/Provider';
import ScrollProvider from './Scroll/Provider';
import IntersectionObserverConsumer from './IntersectionObserver/Consumer';
import ScrollConsumer from './Scroll/Consumer';
import { intersectionObserverSupported } from './utils';

export function Consumer(props) {
  const Component = intersectionObserverSupported()
    ? IntersectionObserverConsumer
    : ScrollConsumer;

  return <Component {...props} />;
}

export function Provider(props) {
  const Component = intersectionObserverSupported()
    ? IntersectionObserverProvider
    : ScrollProvider;

  return <Component {...props} />;
}
