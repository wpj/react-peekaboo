import { createRef, PureComponent } from 'react';

import { Consumer as ContextConsumer } from './context';
import { createContextWrapper } from '../utils';

function isElementInViewport(element) {
  var rect = element.getBoundingClientRect();
  var elemTop = rect.top;
  var elemBottom = rect.bottom;

  // return elemTop >= 0 && elemBottom <= window.innerHeight;
  return elemTop < window.innerHeight && elemBottom >= 0;
}

class Consumer extends PureComponent {
  childRef = createRef();

  state = { isInViewport: false };

  setInViewport = () => {
    const isInViewport = this.childRef.current
      ? isElementInViewport(this.childRef.current)
      : false;
    this.setState({ isInViewport });
  };

  componentDidMount() {
    this.setInViewport();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.counter < this.props.counter) {
      this.setInViewport();
    }
  }

  render() {
    const { isInViewport } = this.state;
    return this.props.children({
      ref: this.childRef,
      isInViewport,
    });
  }
}

export default createContextWrapper(ContextConsumer, Consumer);
