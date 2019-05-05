# `react-peekaboo`

[![Build Status](https://cloud.drone.io/api/badges/wpj/react-peekaboo/status.svg)](https://cloud.drone.io/wpj/react-peekaboo)

React hooks for tracking an element's intersection with the viewport.

## Installation

```
yarn add react-peekaboo
```

Or

```
npm install --save react-peekaboo
```

## Usage

```jsx
import React, { useRef, useState } from 'react';
import { useIntersection, useIntersectionChangeCallback } from 'react-peekaboo';

function Example() {
  const ref = useRef();
  const isIntersecting = useIntersection({ element: ref.current });

  return (
    <div ref={ref}>I am {isIntersecting ? 'visible' : 'not visible'}.</div>
  );
}

function CallbackExample() {
  const ref = useRef();
  const [isIntersecting, onChange] = useState(false);

  useIntersectionChangeCallback(onChange, { element: ref.current });

  return (
    <div ref={ref}>I am {isIntersecting ? 'visible' : 'not visible'}.</div>
  );
}
```

## API

### Props

All functions accept a props object with a common structure:

- `element?: Element | undefined | null`: the DOM element to calculate
  intersection on.

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

#### `useIntersection: (props: Props) => boolean`

Returns the element's intersection status using IntersectionObserver or
`scroll`/`resize` event listeners and `getBoundingClientRect` in unsupported
environments.

#### `useIntersectionChangeCallback: (onChange: (change: boolean) => void, props: Props) => void`

Runs a callback that receives the element's intersection status each time it
changes using IntersectionObserver or `scroll`/`resize` event listeners and
`getBoundingClientRect` in unsupported environments.

#### `useIntersectionObserverIntersection: (props: Props) => boolean`

Returns the element's intersection status using IntersectionObserver.

#### `useIntersectionObserverIntersectionChangeCallback: (onChange: (change: boolean) => void, props: Props) => void`

Runs a callback that receives the element's intersection status each time it
changes using IntersectionObserver.

#### `useScrollIntersection: (props: Props) => boolean`

Returns the element's intersection status using `scroll`/`resize` event
listeners and `getBoundingClientRect`.

#### `useScrollIntersectionChangeCallback: (onChange: (change: boolean) => void, props: Props) => void`

Runs a callback that receives the element's intersection status each time it
changes using `scroll`/`resize` event listeners and `getBoundingClientRect`.

## Caveats

- This module considers edge-adjacent intersections (when the target element is
  directly above/below/beside the viewport) to be in viewport. If you only want
  to consider elements with pixels in the viewport as visible, you can configure
  `offsetBottom`/`offsetLeft`/`offsetRight`/`offsetTop` to be `-1`.
- IntersectionObserver ignores `rootMargin` in iframe contexts, which means that
  offsets will be ignored.
  - https://w3c.github.io/IntersectionObserver/#dom-intersectionobserver-rootmargin
  - https://developers.google.com/web/updates/2016/04/intersectionobserver#iframe_magic
