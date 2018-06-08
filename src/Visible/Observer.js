import { createRef, Component } from 'react';
import { func, array } from 'prop-types';
import memoize from 'memoize-one';

function getUpdatedEntry(changes, ref, entry) {
  const updatedEntry = changes.find(e => e.target == ref);

  return updatedEntry || entry;
}

export default class Observer extends Component {
  static propTypes = {
    changes: array,
    observe: func,
    unobserve: func,
  };

  getUpdatedEntry = memoize(getUpdatedEntry);

  containerRef = createRef();
  observing = false;

  observeRef() {
    if (!this.observing) {
      this.props.observe(this.containerRef.current);
    }
  }

  getEntry() {
    this.entry = this.getUpdatedEntry(
      this.props.changes,
      this.containerRef.current,
      this.entry,
    );

    return this.entry;
  }

  unobserveRef() {
    if (this.observing) {
      this.props.unobserve(this.containerRef.current);
    }
  }

  componentDidMount() {
    this.observeRef();
  }

  componentDidUpdate() {
    this.observeRef();
  }

  componentWillUnmount() {
    this.unobserveRef();
  }

  render() {
    const entry = this.getEntry();

    return this.props.children({
      ref: this.containerRef,
      isInViewport: entry ? entry.isIntersecting : false,
    });
  }
}
