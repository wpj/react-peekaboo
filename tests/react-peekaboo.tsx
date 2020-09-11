import React, { useState } from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('dom-peekaboo', () => {
  return {
    peekaboo: jest.fn(),
  };
});

import { peekaboo, ChangeHandler } from 'dom-peekaboo';

import { useIntersecting, useIntersectionChange } from '../src';

const mockedPeekaboo = peekaboo as jest.Mock;

function UseIntersectingTest() {
  let [ref, isIntersecting] = useIntersecting<HTMLDivElement>();

  let statusText = isIntersecting ? 'intersecting' : 'not intersecting';

  return (
    <div data-testid="status" ref={ref}>
      {statusText}
    </div>
  );
}

function UseIntersectionChangeTest({ enabled = true }: { enabled?: boolean }) {
  let [isIntersecting, setIsIntersecting] = useState<boolean | null>(null);
  let ref = useIntersectionChange<HTMLDivElement>(setIsIntersecting, {
    enabled,
  });

  let statusText: string;

  if (isIntersecting === null) {
    statusText = 'not initialized';
  } else if (isIntersecting) {
    statusText = 'intersecting';
  } else {
    statusText = 'not intersecting';
  }

  return (
    <div data-testid="status" ref={ref}>
      {statusText}
    </div>
  );
}

beforeEach(() => {
  mockedPeekaboo.mockClear();
});

describe('useIsIntersecting', () => {
  test('returns true if element is intersecting', () => {
    mockedPeekaboo.mockImplementationOnce(
      (_element: HTMLElement, onChange: ChangeHandler) => {
        onChange(true);
      },
    );

    let { getByTestId } = render(<UseIntersectingTest />);

    expect(getByTestId('status')).toHaveTextContent('intersecting');
  });

  test('returns false if element is not intersecting', () => {
    mockedPeekaboo.mockImplementationOnce(
      (_element: HTMLElement, onChange: ChangeHandler) => {
        onChange(false);
      },
    );

    let { getByTestId } = render(<UseIntersectingTest />);

    expect(getByTestId('status')).toHaveTextContent('not intersecting');
  });

  test('returns false when not enabled', () => {
    let { getByTestId } = render(<UseIntersectingTest />);

    expect(getByTestId('status')).toHaveTextContent('not intersecting');
  });
});

describe('useIntersectionChange', () => {
  test('runs onChange when element is intersecting', () => {
    mockedPeekaboo.mockImplementationOnce(
      (_element: HTMLElement, onChange: ChangeHandler) => {
        onChange(true);
      },
    );

    let { getByTestId } = render(<UseIntersectionChangeTest />);

    expect(getByTestId('status')).toHaveTextContent('intersecting');
  });

  test('runs onChange when element is not intersecting', () => {
    mockedPeekaboo.mockImplementationOnce(
      (_element: HTMLElement, onChange: ChangeHandler) => {
        onChange(false);
      },
    );

    let { getByTestId } = render(<UseIntersectionChangeTest />);

    expect(getByTestId('status')).toHaveTextContent('not intersecting');
  });

  test('does not run onChange when disabled', () => {
    mockedPeekaboo.mockImplementationOnce(
      (_element: HTMLElement, onChange: ChangeHandler) => {
        onChange(true);
      },
    );

    let { getByTestId } = render(<UseIntersectionChangeTest enabled={false} />);

    expect(mockedPeekaboo).toHaveBeenCalledTimes(0);
    expect(getByTestId('status')).toHaveTextContent('not initialized');
  });
});
