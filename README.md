# `react-peekaboo`

[![Build Status](https://cloud.drone.io/api/badges/wpj/react-peekaboo/status.svg)](https://cloud.drone.io/wpj/react-peekaboo)

React component that notifies you when its child enters or exits the viewport.
Under the hood, it uses the `IntersectionObserver` API in supported environments
and falls back to listening for `scroll` and `resize` events in combination with
`getBoundingClientRect` in unsupported environments.

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
import { InView } from 'react-peekaboo';

function Example() {
  const [isInViewport, setIsInViewport] = useState(false);

  return (
    <InView onChange={setIsInViewport}>
      {ref => (
        <div ref={ref}>I am {isInViewport ? 'visible' : 'not visible'}.</div>
      )}
    </InView>
  );
}
```

## API

### `InView`

#### Props

##### `children: (ref: React.Ref<any>) => JSX.Element`

Render prop that accepts a ref as its parameter. You must apply the ref to a DOM
element.

##### `enabled: boolean`

Enables/disables running the viewport-check side effect.

Default: `true`

##### `offsetBottom?: number`

Number of pixels to add to the bottom of the area checked against when computing
in view elements.

Default: `0`

##### `offsetLeft?: number`

Number of pixels to add to the left of the area checked against when computing
in view elements.

Default: `0`

##### `offsetRight?: number`

Number of pixels to add to the right of the area checked against when computing
in view elements.

Default: `0`

##### `offsetTop?: number`

Number of pixels to add to the top of the area checked against when computing in
view elements.

Default: `0`

##### `onChange: (isInviewPort: boolean) => void`

Callback that's invoked each time the wrapped element enters or exits the
viewport.

##### `throttle?: number`

Number of ms to throttle scroll events (only applies in environments that don't
support IntersectionObserver).

Default: `100`

### `IO`

#### Props

##### `children: (ref: React.Ref<any>) => JSX.Element`

Render prop that accepts a ref as its parameter. You must apply the ref to a DOM
element.

##### `enabled: boolean`

Enables/disables running the viewport-check side effect.

Default: `true`

##### `offsetBottom?: number`

Number of pixels to add to the bottom of the area checked against when computing
in view elements.

Default: `0`

##### `offsetLeft?: number`

Number of pixels to add to the left of the area checked against when computing
in view elements.

Default: `0`

##### `offsetRight?: number`

Number of pixels to add to the right of the area checked against when computing
in view elements.

Default: `0`

##### `offsetTop?: number`

Number of pixels to add to the top of the area checked against when computing in
view elements.

Default: `0`

##### `onChange: (isInviewPort: boolean) => void`

Callback that's invoked each time the wrapped element enters or exits the
viewport.

### `Scroll`

##### `children: (ref: React.Ref<any>) => JSX.Element`

Render prop that accepts a ref as its parameter. You must apply the ref to a DOM
element.

##### `enabled: boolean`

Enables/disables running the viewport-check side effect.

Default: `true`

##### `offsetBottom?: number`

Number of pixels to add to the bottom of the area checked against when computing
in view elements.

Default: `0`

##### `offsetLeft?: number`

Number of pixels to add to the left of the area checked against when computing
in view elements.

Default: `0`

##### `offsetRight?: number`

Number of pixels to add to the right of the area checked against when computing
in view elements.

Default: `0`

##### `offsetTop?: number`

Number of pixels to add to the top of the area checked against when computing in
view elements.

Default: `0`

##### `onChange: (isInviewPort: boolean) => void`

Callback that's invoked each time the wrapped element enters or exits the
viewport.

##### `throttle?: number`

Number of ms to throttle scroll events.

Default: `100`

## Caveats

- This module considers edge-adjacent intersections (when the target element is
  directly above/below/beside the viewport) to be in viewport. If you only want
  to consider elements with pixels in the viewport as visible, you can configure
  `offsetBottom`/`offsetLeft`/`offsetRight`/`offsetTop` to be `-1`.
- IntersectionObserver ignores `rootMargin` in iframe contexts, which means that
  offsets will be ignored.
  - https://w3c.github.io/IntersectionObserver/#dom-intersectionobserver-rootmargin
  - https://developers.google.com/web/updates/2016/04/intersectionobserver#iframe_magic
