import * as React from 'react';

import { Box } from '../test/helpers';

export default function ListPage({
  component,
}: {
  component: 'scroll' | 'io';
}) {
  const [offset, setOffset] = React.useState(0);
  React.useEffect(() => {
    setOffset(window.innerHeight);
  });

  const style = { height: '100vh' };

  return (
    <>
      <Box component={component} style={style} id={0} />
      <Box component={component} style={style} id={1} />
      <Box component={component} offsetTop={offset} style={style} id={2} />
      <Box component={component} style={style} id={3} />
      <Box component={component} style={style} id={4} />
      <Box component={component} style={style} id={5} />
      <Box component={component} style={style} id={6} />
      <Box component={component} offsetBottom={offset} style={style} id={7} />
      <Box component={component} style={style} id={8} />
      <Box component={component} style={style} id={9} />
    </>
  );
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
