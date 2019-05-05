import { useEffect, useState } from 'react';

import {
  io,
  scroll,
  intersection,
  IntersectionChangeCallback,
  Effect,
  Props as PeekabooProps,
} from './peekaboo';
import { Omit } from './type-utils';

export type Props = Omit<PeekabooProps, 'onChange'> & {
  element?: Element | undefined | null;
  enabled?: boolean;
};

function useIntersectionEffect(
  effect: Effect,
  onChange: IntersectionChangeCallback,
  { element, enabled = true, ...props }: Props,
) {
  useEffect(() => {
    if (!element || !enabled) {
      return;
    }

    return effect({ ...props, element, onChange });
  }, [
    element,
    enabled,
    props.offsetBottom,
    props.offsetLeft,
    props.offsetRight,
    props.offsetTop,
    onChange,
    props.throttle,
  ]);
}

export function useScrollIntersectionChangeCallback(
  onChange: IntersectionChangeCallback,
  props: Props,
) {
  useIntersectionEffect(scroll, onChange, props);
}

export function useIntersectionObserverIntersectionChangeCallback(
  onChange: IntersectionChangeCallback,
  props: Props,
) {
  useIntersectionEffect(io, onChange, props);
}

export function useIntersectionChangeCallback(
  onChange: IntersectionChangeCallback,
  props: Props,
) {
  useIntersectionEffect(intersection, onChange, props);
}

function useIsIntersecting(
  useIntersectionChangeCallbackHook: typeof useIntersectionChangeCallback,
  props: Props,
) {
  const [isIntersecting, onChange] = useState(false);

  useIntersectionChangeCallbackHook(onChange, props);

  return isIntersecting;
}

export function useScrollIntersection(props: Props) {
  return useIsIntersecting(useScrollIntersectionChangeCallback, props);
}

export function useIntersectionObserverIntersection(props: Props) {
  return useIsIntersecting(
    useIntersectionObserverIntersectionChangeCallback,
    props,
  );
}

export function useIntersection(props: Props) {
  return useIsIntersecting(useIntersectionChangeCallback, props);
}
