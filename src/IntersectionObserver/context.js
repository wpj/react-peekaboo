import { createContext } from 'react';

const noop = () => {};

export const DEFAULT_STATE = {
  observe: noop,
  unobserve: noop,
  changes: [],
};

export const { Provider, Consumer } = createContext(DEFAULT_STATE);
