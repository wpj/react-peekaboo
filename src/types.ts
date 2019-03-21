import { RefObject } from 'react';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface Props {
  children: (
    ref: RefObject<any> | ((node?: Element | null) => void),
  ) => JSX.Element;
  offsetBottom: number;
  offsetTop: number;
  onChange: (isInviewPort: boolean) => void;
  throttle: number;
}
