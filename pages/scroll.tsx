import * as React from 'react';

import { Props as InViewProps, Scroll } from '../src';
import { ScrollBox as Box } from '../test/helpers';

export default function ScrollExamplePage() {
  const [offset, setOffset] = React.useState(0);
  React.useEffect(() => {
    setOffset(self.innerHeight);
  });

  if (!offset) {
    return null;
  }

  return (
    <div>
      <Box height="100vh" id={0} />
      <Box height="100vh" id={1} />
      <Box height="100vh" offsetTop={offset} offsetBottom={offset} id={2} />
      <Box height="100vh" id={3} />
      <Box height="100vh" id={4} />
      <Box height="100vh" id={5} />
      <Box height="100vh" id={6} />
      <Box height="100vh" id={7} />
      <Box height="100vh" id={8} />
      <Box height="100vh" id={9} />
    </div>
  );
}
