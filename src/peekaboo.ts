import throttleFunc from 'lodash.throttle';

let supported: boolean;

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

export function intersectionObserverSupported() {
  if (supported === undefined) {
    supported =
      typeof window !== 'undefined' && 'IntersectionObserver' in window;
  }

  return supported;
}

export function io({
  element,
  offsetBottom,
  offsetTop,
  onChange,
}: IOProps): TeardownFunc {
  const rootMargin = `${offsetTop}px 0px ${offsetBottom}px 0px`;

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

function isElementInViewport(
  element: Element,
  offsetBottom: number,
  offsetTop: number,
): boolean {
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
