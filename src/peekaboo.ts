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
  offsetLeft: number;
  offsetRight: number;
  offsetTop: number;
  onChange: (isInviewPort: boolean) => void;
}

export type ScrollProps = IOProps & {
  throttle: number;
};

export function io({
  element,
  offsetBottom,
  offsetLeft,
  offsetRight,
  offsetTop,
  onChange,
}: IOProps): TeardownFunc {
  /*
   * rootMargin grows/shrinks the bounding rect of the root element (the
   * viewport), while offsets apply to the element, so offsets are mapped to
   * rootMargin values as follows:
   *
   * offsetBottom: rootMargin top
   * offsetLeft: rootMargin right
   * offsetRight: rootMargin left
   * offsetTop: rootMargin bottom
   */
  const rootMargin = `${offsetBottom}px ${offsetLeft}px ${offsetTop}px ${offsetRight}px`;

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

function isElementIntersecting(
  element: Element,
  {
    offsetBottom,
    offsetLeft,
    offsetRight,
    offsetTop,
  }: Pick<IOProps, 'offsetBottom' | 'offsetLeft' | 'offsetRight' | 'offsetTop'>,
): boolean {
  if (!isElementInDocument(element)) {
    return false;
  }

  const rect = element.getBoundingClientRect();

  // bottom edge delta from viewport top ajusted with offset
  const adjustedBottom = rect.bottom + offsetBottom;

  // left edge delta from viewport left ajusted with offset
  const adjustedLeft = rect.left - offsetLeft;

  // right edge delta from viewport left ajusted with offset
  const adjustedRight = rect.right + offsetRight;

  // top edge delta from viewport top ajusted with offset
  const adjustedTop = rect.top - offsetTop;

  return (
    // bottom edge is below (or intersecting with) viewport top
    adjustedBottom >= 0 &&
    // left edge is left of (or intersecting with) viewport right
    adjustedLeft <= window.innerWidth &&
    // right edge is right of (or intersecting with) viewport left
    adjustedRight >= 0 &&
    // top edge is above (or intersecting iwth) viewport bottom
    adjustedTop <= window.innerHeight
  );
}

// Note: If element is removed from the document, its visibility won't be
// recalculated until a resize/scroll event is triggered.
export function scroll({
  element,
  offsetBottom,
  offsetLeft,
  offsetRight,
  offsetTop,
  onChange,
  throttle,
}: ScrollProps): TeardownFunc {
  let prevInViewport: boolean;

  const checkViewport = () => {
    const isInViewport = element
      ? isElementIntersecting(element, {
          offsetBottom,
          offsetLeft,
          offsetRight,
          offsetTop,
        })
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
