// import React from 'react';
// import { Stack } from '@mui/material';
// import { InfinitySpin as InfinitSpin } from 'react-loader-spinner';

// const Loader = () => (
//   <Stack direction="row" justifyContent="center" alignItems="center" width="100%">
//     <InfinitSpin color="grey" />
//   </Stack>
// );

// export default Loader;

import React from 'react';
import { Stack } from '@mui/material';
import { InfinitySpin } from 'react-loader-spinner';

const Loader = () => (
  <Stack direction="row" justifyContent="center" alignItems="center" width="100%">
    <InfinitySpin color="grey" />
  </Stack>
);

export default Loader;