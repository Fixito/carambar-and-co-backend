import process from 'node:process';

import { syncDatabase, testConnection } from '../db/index.js';
import * as JokesService from '../services/jokes.service.js';

const sampleJokes = [
  {
    text: 'Quelle est la femelle du hamster ?',
    answer: 'L\'Amsterdam',
  },
  {
    text: 'Que dit un oignon quand il se cogne ?',
    answer: 'Aïe',
  },
  {
    text: 'Quel est l\'animal le plus heureux ?',
    answer: 'Le hibou, parce que sa femme est chouette.',
  },
  {
    text: 'Pourquoi le football c\'est rigolo ?',
    answer: 'Parce que Thierry en rit',
  },
  {
    text: 'Quel est le sport le plus fruité ?',
    answer: 'La boxe, parce que tu te prends des pêches dans la poire et tu tombes dans les pommes.',
  },
  {
    text: 'Que se fait un Schtroumpf quand il tombe ?',
    answer: 'Un Bleu',
  },
  {
    text: 'Quel est le comble pour un marin ?',
    answer: 'Avoir le nez qui coule',
  },
  {
    text: 'Qu\'est ce que les enfants usent le plus à l\'école ?',
    answer: 'Le professeur',
  },
  {
    text: 'Quel est le sport le plus silencieux ?',
    answer: 'Le para-chuuuut',
  },
  {
    text: 'Quel est le comble pour un joueur de bowling ?',
    answer: 'C\'est de perdre la boule',
  },
];

async function seedDatabase() {
  try {
    console.log('🌱 Début du peuplement de la base de données...');

    await testConnection();

    await syncDatabase(true);

    for (const joke of sampleJokes) {
      await JokesService.createJoke(joke);
    }

    console.log(`🎉 Base de données peuplée avec ${sampleJokes.length} blagues !`);

    process.exit(0);
  }
  catch (error) {
    console.error('❌ Erreur lors du peuplement:', error);
    process.exit(1);
  }
}

seedDatabase();
