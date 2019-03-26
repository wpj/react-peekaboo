import { Ref as ReactRef } from 'react';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type Ref = ReactRef<any>;

export const defaultProps = {
  offsetBottom: 0,
  offsetTop: 0,
  throttle: 100,
};

export type Props = {
  children: (ref: Ref) => JSX.Element;
  onChange: (isInviewPort: boolean) => void;
} & typeof defaultProps;
