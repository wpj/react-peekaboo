/* @jsx createElement */

import { createElement, useRef, CSSProperties, FunctionComponent } from 'react';

import {
  useIntersectionObserverIntersection,
  useScrollIntersection,
  Props,
} from '../../src/hooks';

export type BoxProps = {
  component: 'io' | 'scroll';
  id: number;
  style?: CSSProperties;
} & Pick<
  Props,
  | 'enabled'
  | 'offsetBottom'
  | 'offsetLeft'
  | 'offsetRight'
  | 'offsetTop'
  | 'throttle'
>;

function useIntersection(scroll, props) {
  return scroll
    ? useScrollIntersection(props)
    : useIntersectionObserverIntersection(props);
}

export const Box: FunctionComponent<BoxProps> = ({
  component,
  enabled,
  id,
  offsetBottom,
  offsetLeft,
  offsetRight,
  offsetTop,
  style: stylesToMerge,
  throttle,
}) => {
  const ref = useRef();
  const element = ref.current;

  const isIntersecting = useIntersection(component === 'scroll', {
    element,
    enabled,
    offsetBottom,
    offsetLeft,
    offsetRight,
    offsetTop,
    throttle,
  });

  const style = {
    margin: 0,
    backgroundColor: 'goldenrod',
    ...stylesToMerge,
  };

  return (
    <div data-testid={id} style={style} id={`box-${id}`} ref={ref}>
      {isIntersecting ? 'visible' : 'hidden'}
    </div>
  );
};

Box.defaultProps = {
  style: {},
};
