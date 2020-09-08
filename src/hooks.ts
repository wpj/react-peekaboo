import { useEffect, useState, RefCallback } from 'react';

import {
  intersection,
  ChangeHandler,
  Options as PeekabooOptions,
  SetupHandler,
} from './peekaboo';

export type Options = PeekabooOptions & {
  enabled?: boolean;
};

export function usePeekaboo(
  setup: SetupHandler,
  onChange: ChangeHandler,
  options: Options,
): RefCallback<HTMLElement> {
  let [element, ref] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!element || options.enabled === false) {
      return undefined;
    }

    return setup(element, onChange, options);
  }, [element, onChange, options]);

  return ref;
}

export function useIntersectionChange(
  onChange: ChangeHandler,
  options: Options,
) {
  return usePeekaboo(intersection, onChange, options);
}

export function useIntersecting(options: Options) {
  let [intersecting, setIntersecting] = useState<boolean>(false);

  let ref = usePeekaboo(intersection, setIntersecting, options);
  return [ref, intersecting];
}
