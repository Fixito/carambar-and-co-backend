import process from 'node:process';

import app from './app.js';

const port = process.env.PORT || 5000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://localhost:${port}/`);
});
