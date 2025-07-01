import process from 'node:process';

import app from './app.js';
import { syncDatabase, testConnection } from './db/index.js';

const port = process.env.PORT || 5000;

async function startServer() {
  try {
    await testConnection();

    await syncDatabase();

    app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`🚀 Serveur démarré sur http://localhost:${port}/`);
      // eslint-disable-next-line no-console
      console.log(`📚 API disponible sur http://localhost:${port}/api/v1/blagues`);
    });
  }
  catch (error) {
    console.error('❌ Erreur lors du démarrage du serveur:', error);
    process.exit(1);
  }
}

startServer();
