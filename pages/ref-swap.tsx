import React from 'react';

import { Box } from '../test/helpers';

export default function RefSwapPage({
  component,
  swapAfter,
}: {
  component: 'scroll' | 'io';
  swapAfter: number;
}) {
  return (
    <>
      <div style={{ height: 10 }} />
      <Box
        component={component}
        swapTo="p"
        swapAfter={swapAfter}
        style={{
          height: '100vh',
        }}
        id={0}
      />
      <div style={{ height: 10 }} />
    </>
  );
}

RefSwapPage.getInitialProps = ({
  query,
}: {
  query: { [key: string]: string };
}) => {
  return {
    component: (query.c || 'io') as 'io' | 'scroll',
    swapAfter: query.swap_after ? parseInt(query.swap_after, 10) : 0,
  };
};
