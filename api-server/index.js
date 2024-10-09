import app from './server.js';
import config from './config/config.js';

app.listen(config.port, () => {
  console.info(`Server starting at http://localhost:${config.port}...`);
});
