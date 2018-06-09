import React from 'react';

let supported;

export function intersectionObserverSupported() {
  if (supported === undefined) {
    supported =
      typeof window !== 'undefined' && 'IntersectionObserver' in window;
  }

  return supported;
}

export function createContextWrapper(Consumer, Component) {
  return function WrappedComponent(props) {
    return (
      <Consumer>{context => <Component {...props} {...context} />}</Consumer>
    );
  };
}
