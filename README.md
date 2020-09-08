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
import React, { useState } from 'react';
import { useIntersecting, useIntersectionChange } from 'react-peekaboo';

function IntersectionExample() {
  const [ref, isIntersecting] = useIntersecting();

  return (
    <div ref={ref}>I am {isIntersecting ? 'visible' : 'not visible'}.</div>
  );
}

function IntersectionChangeExample() {
  const [isIntersecting, onChange] = useState(false);
  const ref = useIntersectionChange(onChange);

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

#### `useIntersecting: (options: Options) => boolean`

Returns the element's intersection status using IntersectionObserver or
`scroll`/`resize` event listeners and `getBoundingClientRect` in unsupported
environments.

#### `useIntersectionChange: (onChange: (change: boolean) => void, options: Options) => void`

Runs a callback that receives the element's intersection status each time it
changes using IntersectionObserver or `scroll`/`resize` event listeners and
`getBoundingClientRect` in unsupported environments.

## Caveats

- This module considers edge-adjacent intersections (when the target element is
  directly above/below/beside the viewport) to be in viewport. If you only want
  to consider elements with pixels in the viewport as visible, you can configure
  `offsetBottom`/`offsetLeft`/`offsetRight`/`offsetTop` to be `-1`.
- IntersectionObserver ignores `rootMargin` in iframe contexts, which means that
  offsets will be ignored.
  - https://w3c.github.io/IntersectionObserver/#dom-intersectionobserver-rootmargin
  - https://developers.google.com/web/updates/2016/04/intersectionobserver#iframe_magic
