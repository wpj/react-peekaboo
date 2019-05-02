import * as React from 'react';

import { Box } from '../test/helpers';

export default function ListPage({
  component,
  direction,
}: {
  component: 'scroll' | 'io';
  direction: 'horizontal' | 'vertical';
}) {
  const [offset, setOffset] = React.useState({ x: 0, y: 0 });
  React.useEffect(() => {
    setOffset({ x: window.innerWidth, y: window.innerHeight });
  }, []);

  const style = {
    minHeight: '100vh',
    minWidth: '100vw',
  };

  return (
    <div style={{ display: direction === 'horizontal' ? 'flex' : 'block' }}>
      <Box component={component} style={style} id={0} />
      <Box component={component} style={style} id={1} />
      <Box
        component={component}
        offsetLeft={offset.x}
        offsetTop={offset.y}
        style={style}
        id={2}
      />
      <Box component={component} style={style} id={3} />
      <Box component={component} style={style} id={4} />
      <Box component={component} style={style} id={5} />
      <Box component={component} style={style} id={6} />
      <Box
        component={component}
        offsetBottom={offset.y}
        offsetRight={offset.x}
        style={style}
        id={7}
      />
      <Box component={component} style={style} id={8} />
      <Box component={component} style={style} id={9} />
    </div>
  );
}

ListPage.getInitialProps = ({
  query,
}: {
  query: { [key: string]: string };
}) => {
  return {
    component: query.c || 'io',
    direction: query.direction || 'vertical',
  };
};
