import throttleFunc from 'lodash.throttle';

let supported: boolean;
export function intersectionObserverSupported() {
  if (supported === undefined) {
    supported =
      typeof window !== 'undefined' && 'IntersectionObserver' in window;
  }

  return supported;
}

export type TeardownFunc = () => void;

export interface IOProps {
  element: Element;
  offsetBottom: number;
  offsetTop: number;
  onChange: (isInviewPort: boolean) => void;
}

export type ScrollProps = IOProps & {
  throttle: number;
};

export function io({
  element,
  offsetBottom,
  offsetTop,
  onChange,
}: IOProps): TeardownFunc {
  // rootMargin grows/shrinks the bounding rect of the root element (the
  // viewport). offsetTop/offsetBottom apply to element, so offsetTop is
  // remapped to rootMargin bottom and offsetBottom is remapped to rootMargin
  // top.
  const rootMargin = `${offsetBottom}px 0px ${offsetTop}px 0px`;

  const observer = new IntersectionObserver(
    ([entry]) => {
      onChange(entry.isIntersecting);
    },
    {
      root: null,
      rootMargin,
    },
  );

  observer.observe(element);

  return () => {
    observer.unobserve(element);
  };
}

function isElementInDocument(element: Element) {
  return 'isConnected' in element
    ? element.isConnected
    : document.body.contains(element);
}

function isElementInViewport(
  element: Element,
  offsetBottom: number,
  offsetTop: number,
): boolean {
  if (!isElementInDocument(element)) {
    return false;
  }

  const rect = element.getBoundingClientRect();

  // top edge delta from viewport top
  const top = rect.top;

  // bottom edge delta from viewport top
  const bottom = rect.bottom;

  const adjustedTop = top - offsetTop;
  const adjustedBottom = bottom + offsetBottom;

  const isTopEdgeAboveViewportBottom = adjustedTop <= window.innerHeight;
  const isBottomEdgeBelowViewportTop = adjustedBottom >= 0;

  const isIntersecting =
    isTopEdgeAboveViewportBottom && isBottomEdgeBelowViewportTop;

  return isIntersecting;
}

// Note: If element is removed from the document, its visibility won't be
// recalculated until a resize/scroll event is triggered.
export function scroll({
  element,
  offsetBottom,
  offsetTop,
  onChange,
  throttle,
}: ScrollProps): TeardownFunc {
  let prevInViewport: boolean;

  const checkViewport = () => {
    const isInViewport = element
      ? isElementInViewport(element, offsetBottom, offsetTop)
      : false;

    if (isInViewport !== prevInViewport) {
      prevInViewport = isInViewport;
      onChange(isInViewport);
    }
  };

  const eventHandler = throttleFunc(checkViewport, throttle);

  checkViewport();
  window.addEventListener('scroll', eventHandler);
  window.addEventListener('resize', eventHandler);

  return () => {
    window.removeEventListener('scroll', eventHandler);
    window.removeEventListener('resize', eventHandler);
  };
}
