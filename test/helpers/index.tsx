/* @jsx createElement */

import {
  createElement,
  useState,
  CSSProperties,
  FunctionComponent,
} from 'react';

import { usePeekaboo, Props } from '../../src/hooks';
import { scroll, io } from '../../src/peekaboo';

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
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

  const ref = usePeekaboo(
    component === 'scroll' ? scroll : io,
    setIsIntersecting,
    {
      enabled,
      offsetBottom,
      offsetLeft,
      offsetRight,
      offsetTop,
      throttle,
    },
  );

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
