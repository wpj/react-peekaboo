import React, {
  forwardRef,
  useEffect,
  useState,
  CSSProperties,
  ComponentProps,
  ElementType,
  FunctionComponent,
} from 'react';

import { Omit, Ref } from '../../src/types';
import { IO, Scroll } from '../../src';

interface TestBoxProps {
  as?: ElementType;
  id: number;
  isInViewport: boolean;
  style?: CSSProperties;
  swapAfter?: number;
  swapTo?: ElementType;
}

// Renders a styled element that contains information about its current
// visibility status with the viewport. It can also optionally swap out its
// underlying dom node after a configurable timeout.
export const TestBox = forwardRef<Ref, TestBoxProps>(
  (
    {
      as: As,
      id,
      isInViewport,
      style: stylesToMerge,
      swapAfter,
      swapTo: SwapTo,
    },
    ref,
  ) => {
    const [swap, setSwap] = useState(false);

    const style = {
      margin: 0,
      backgroundColor: 'goldenrod',
      ...stylesToMerge,
    };

    useEffect(() => {
      let timerId: any;
      if (SwapTo && swapAfter != undefined) {
        timerId = setTimeout(() => {
          setSwap(true);
        }, swapAfter);
      }

      return () => {
        clearTimeout(timerId);
      };
    }, [SwapTo, swapAfter]);

    const C = (swap ? SwapTo : As) as ElementType;

    return (
      <C data-testid={id} style={style} id={`box-${id}`} ref={ref}>
        {isInViewport ? 'visible' : 'hidden'}
      </C>
    );
  },
);

TestBox.defaultProps = {
  as: 'div',
  style: {},
};

export type BoxProps = { component: 'io' | 'scroll' } & Partial<
  Pick<
    ComponentProps<typeof Scroll>,
    'enabled' | 'offsetBottom' | 'offsetTop' | 'throttle'
  >
> &
  Omit<TestBoxProps, 'isInViewport'>;

export const Box: FunctionComponent<BoxProps> = ({
  component,
  enabled,
  offsetBottom,
  offsetTop,
  throttle,
  ...props
}) => {
  const [isInViewport, setState] = useState(false);

  const peekabooProps = {
    enabled,
    offsetBottom,
    offsetTop,
    throttle,
  };

  const testBoxProps = {
    isInViewport,
    ...props,
  };

  if (component === 'scroll') {
    return (
      <Scroll throttle={0} {...peekabooProps} onChange={setState}>
        {ref => <TestBox ref={ref} {...testBoxProps} />}
      </Scroll>
    );
  }

  return (
    <IO {...peekabooProps} onChange={setState}>
      {ref => <TestBox ref={ref} {...testBoxProps} />}
    </IO>
  );
};
