import throttle from 'lodash.throttle';
import { createRef, Component } from 'react';

import { Props } from './types';

// TODO: zero out offsets when in iframe context
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

export default class Scroll extends Component<Props> {
  static defaultProps = {
    offsetBottom: 0,
    offsetTop: 0,
    throttle: 100,
  };

  childRef = createRef<Element>();

  isInViewport?: boolean;

  handleChange = (isInViewport: boolean) => {
    this.props.onChange(isInViewport);
  };

  checkInViewport = () => {
    const { offsetBottom, offsetTop } = this.props;
    return this.childRef.current
      ? isElementInViewport(this.childRef.current, offsetBottom, offsetTop)
      : false;
  };

  checkVisibility = () => {
    const isInViewport = this.checkInViewport();
    if (isInViewport !== this.isInViewport) {
      this.isInViewport = isInViewport;
      this.handleChange(isInViewport);
    }
  };

  eventHandler = throttle(this.checkVisibility, this.props.throttle);

  componentDidMount() {
    this.checkVisibility();
    window.addEventListener('scroll', this.eventHandler);
    window.addEventListener('resize', this.eventHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.eventHandler);
    window.removeEventListener('resize', this.eventHandler);
  }

  render() {
    return this.props.children(this.childRef);
  }
}
