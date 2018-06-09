import { createContext } from 'react';

export const DEFAULT_STATE = {
  counter: 0,
};

export const { Provider, Consumer } = createContext(DEFAULT_STATE);
