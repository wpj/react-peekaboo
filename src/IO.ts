import { createRef, Component } from 'react';

import { Props } from './types';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export default class IO extends Component<Omit<Props, 'throttle'>> {
  static defaultProps = {
    offsetBottom: 0,
    offsetTop: 0,
  };

  observer: null | IntersectionObserver = null;

  childRef = createRef<Element>();

  componentDidMount() {
    this.createObserver();
    this.observeRef();
  }

  createObserver() {
    const { offsetBottom, offsetTop } = this.props;
    const rootMargin = `${offsetTop}px 0px ${offsetBottom}px 0px`;

    this.observer = new IntersectionObserver(this.updateEntry, {
      root: null,
      rootMargin,
    });
  }

  handleChange = (isInViewport: boolean) => {
    this.props.onChange(isInViewport);
  };

  updateEntry = ([entry]: IntersectionObserverEntry[]) => {
    this.handleChange(entry.isIntersecting);
  };

  observeRef() {
    if (this.childRef.current && this.observer) {
      this.observer.observe(this.childRef.current);
    }
  }

  unobserveRef() {
    if (this.childRef.current && this.observer) {
      this.observer.unobserve(this.childRef.current);
    }
  }

  componentDidUpdate() {
    this.observeRef();
  }

  componentWillUnmount() {
    this.unobserveRef();
  }

  render() {
    return this.props.children(this.childRef);
  }
}
