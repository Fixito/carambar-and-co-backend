import process from 'node:process';
import { Sequelize } from 'sequelize';

import 'dotenv/config';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DATABASE_URL,
  logging: false,
});

export async function testConnection() {
  try {
    await sequelize.authenticate();
    // eslint-disable-next-line no-console
    console.log('✅ Connexion à la base de données SQLite établie avec succès.');
  }
  catch (error) {
    console.error('❌ Impossible de se connecter à la base de données:', error);
    throw error;
  }
}

export async function syncDatabase(force = false) {
  try {
    await sequelize.sync({ force });
    // eslint-disable-next-line no-console
    console.log(`✅ Base de données synchronisée${force ? ' (forcée)' : ''}.`);
  }
  catch (error) {
    console.error('❌ Erreur lors de la synchronisation:', error);
    throw error;
  }
}

export default sequelize;
