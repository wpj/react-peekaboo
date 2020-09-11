import { useEffect, useMemo, useState, RefCallback } from 'react';

import {
  peekaboo,
  ChangeHandler,
  Options as PeekabooOptions,
  SetupHandler,
} from 'dom-peekaboo';

export type Options = PeekabooOptions & {
  enabled?: boolean;
};

export function usePeekaboo<E extends HTMLElement>(
  setup: SetupHandler,
  onChange: ChangeHandler,
  options: Options = {},
): RefCallback<E> {
  let [element, ref] = useState<E | null>(null);

  // Options needs to be memoized here to handle when options are passed that
  // are structurally identical but referentially different. Without
  // memoization, this would trigger the useEffect to re-run.
  let memoizedOptions = useMemo(() => options, [
    options.enabled,
    options.offsetBottom,
    options.offsetLeft,
    options.offsetRight,
    options.offsetTop,
    options.throttle,
  ]);

  useEffect(() => {
    if (!element || memoizedOptions.enabled === false) {
      return undefined;
    }

    return setup(element, onChange, memoizedOptions);
  }, [element, onChange, memoizedOptions]);

  return ref;
}

export function useIntersectionChange<E extends HTMLElement>(
  onChange: ChangeHandler,
  options: Options = {},
): RefCallback<E> {
  return usePeekaboo<E>(peekaboo, onChange, options);
}

export function useIntersecting<E extends HTMLElement>(
  options: Options = {},
): [RefCallback<E>, boolean] {
  let [intersecting, setIntersecting] = useState<boolean>(false);

  let ref = usePeekaboo<E>(peekaboo, setIntersecting, options);
  return [ref, intersecting];
}
