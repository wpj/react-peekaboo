import { createContext } from 'react';

export const DEFAULT_STATE = {
  useObserver: false,
  observer: null,
  changes: [],
  counter: 0,
};

export const { Provider, Consumer } = createContext(DEFAULT_STATE);
