import { Ref as ReactRef } from 'react';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type Ref = ReactRef<any>;

export interface Props {
  children: (ref: Ref) => JSX.Element;
  offsetBottom: number;
  offsetTop: number;
  onChange: (isInviewPort: boolean) => void;
  throttle: number;
}
