import { RefObject } from 'react';

export interface Props {
  children: (
    ref: RefObject<any> | ((node?: Element | null) => void),
  ) => JSX.Element;
  offsetBottom: number;
  offsetTop: number;
  onChange: (isInviewPort: boolean) => void;
  throttle: number;
}
