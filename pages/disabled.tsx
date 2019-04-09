import * as React from 'react';

import { Box } from '../test/helpers';

export default function ListPage({
  component,
}: {
  component: 'scroll' | 'io';
}) {
  const style = { height: '100vh' };

  return <Box component={component} enabled={false} style={style} id={0} />;
}

ListPage.getInitialProps = ({
  query,
}: {
  query: { [key: string]: string };
}) => {
  return {
    component: query.c || 'io',
  };
};
