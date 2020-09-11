import { useEffect, useState, RefCallback } from 'react';

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

  useEffect(() => {
    if (!element || options.enabled === false) {
      return undefined;
    }

    return setup(element, onChange, options);
  }, [element, onChange, options]);

  return ref;
}

export function useIntersectionChange<E extends HTMLElement>(
  onChange: ChangeHandler,
  options: Options = {},
) {
  return usePeekaboo<E>(peekaboo, onChange, options);
}

export function useIntersecting<E extends HTMLElement>(
  options: Options = {},
): [RefCallback<E>, boolean] {
  let [intersecting, setIntersecting] = useState<boolean>(false);

  let ref = usePeekaboo<E>(peekaboo, setIntersecting, options);
  return [ref, intersecting];
}
