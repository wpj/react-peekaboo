import * as React from 'react';

import { IO, Scroll, Props as InViewProps } from '../../src';

export const IOBox: React.FunctionComponent<
  Partial<InViewProps> & {
    height: string;
    id: number;
  }
> = ({ height, id, ...props }) => {
  const [isInViewport, setIsInViewport] = React.useState(false);
  return (
    <IO {...props} onChange={setIsInViewport}>
      {ref => (
        <div
          data-testid={id}
          style={{
            height,
            backgroundColor: 'goldenrod',
          }}
          id={`box-${id}`}
          ref={ref}
        >
          {isInViewport ? 'visible' : 'hidden'}
        </div>
      )}
    </IO>
  );
};

export const ScrollBox: React.FunctionComponent<
  Partial<InViewProps> & {
    height: string;
    id: number;
  }
> = ({ height, id, ...props }) => {
  const [isInViewport, setIsInViewport] = React.useState(false);
  return (
    <Scroll {...props} throttle={0} onChange={setIsInViewport}>
      {ref => (
        <div
          data-testid={id}
          style={{
            height,
            backgroundColor: 'goldenrod',
          }}
          id={`box-${id}`}
          ref={ref}
        >
          {isInViewport ? 'visible' : 'hidden'}
        </div>
      )}
    </Scroll>
  );
};
