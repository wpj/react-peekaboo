# `react-peekaboo`

[![CI Status](https://github.com/wpj/react-peekaboo/workflows/CI/badge.svg)](https://github.com/wpj/react-peekaboo/actions)

React hooks for monitoring an element's intersection with the viewport.

## Installation

```
npm install react-peekaboo
```

## Usage

```tsx
import React, { useState } from 'react';
import { useIntersecting, useIntersectionChange } from 'react-peekaboo';

function UseIntersectionExample() {
  let [ref, isIntersecting] = useIntersecting<HTMLDivElement>();

  return (
    <div ref={ref}>I am {isIntersecting ? 'visible' : 'not visible'}.</div>
  );
}

function UseIntersectionChangeExample() {
  let [isIntersecting, onChange] = useState<boolean>(false);
  let ref = useIntersectionChange<HTMLDivElement>(onChange);

  return (
    <div ref={ref}>I am {isIntersecting ? 'visible' : 'not visible'}.</div>
  );
}
```

## API

### Options

All functions accept a common set of options:

- `enabled?: boolean`: Enables/disables running the side effect that calculates
  the element's intersection status. (default: `true`)

- `offsetBottom?: number`: Number of pixels to add to the bottom of the area
  checked against when computing element intersection. (default: `0`)

- `offsetLeft?: number`: Number of pixels to add to the left of the area checked
  against when computing element intersection. (default: `0`)

- `offsetRight?: number`: Number of pixels to add to the right of the area
  checked against when computing element intersection. (default: `0`)

- `offsetTop?: number`: Number of pixels to add to the top of the area checked
  against when computing element intersection. (default: `0`)

- `throttle?: number`: Number of ms to throttle scroll events (only applies in
  environments that don't support IntersectionObserver or when using
  `useScrollIntersection`/`useScrollIntersectionChangeCallback`). (default:
  `100`)

### Exports

#### `useIntersecting`

Type: `(options: Options) => [RefCallback, boolean]`

Returns a ref and the element's intersection status using IntersectionObserver
or `scroll`/`resize` event listeners and `getBoundingClientRect` in unsupported
environments.

The ref returned must be attached to a DOM node.

#### `useIntersectionChange`

Type:

```typescript
(onChange: (isIntersecting: boolean) => void, options: Options) => RefCallback;
```

Runs a callback that receives the element's intersection status each time it
changes using IntersectionObserver or `scroll`/`resize` event listeners and
`getBoundingClientRect` in unsupported environments.

Returns a ref that must be attached to a DOM node.

#### `usePeekaboo`

Type:

```typescript
type SetupHandler = (
  element: HTMLElement,
  onChange: (isIntersecting: boolean) => void,
  options?: Options,
) => TeardownHandler;

(
  setup: SetupHandler,
  onChange: (isIntersecting: boolean) => void,
  options?: Options,
) => RefCallback;
```

Uses `setup` to run `onChange` when the element's intersection status changes.
You can pass `scroll`, `io`, or `peekaboo` from `dom-peekaboo` or implement your
own setup function.
