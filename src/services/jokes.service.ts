import type { JokeAttributes, JokeCreationAttributes } from '../models/jokes.model.js';
import { Joke } from '../models/jokes.model.js';
import { DatabaseError, NotFoundError } from '../utils/errors.js';

export async function getAllJokes(): Promise<JokeAttributes[]> {
  const jokes = await Joke.findAll({
    order: [['createdAt', 'DESC']],
  });
  return jokes.map(joke => joke.toJSON());
}

export async function getJokeById(id: string): Promise<JokeAttributes> {
  const joke = await Joke.findByPk(id);

  if (!joke) {
    throw new NotFoundError('Blague', id);
  }

  return joke.toJSON();
}

export async function getRandomJoke(): Promise<JokeAttributes> {
  try {
    const count = await Joke.count();

    if (count === 0) {
      throw new NotFoundError('Aucune blague disponible');
    }

    const randomOffset = Math.floor(Math.random() * count);
    const joke = await Joke.findOne({
      offset: randomOffset,
    });

    if (!joke) {
      throw new DatabaseError('Erreur lors de la récupération de la blague aléatoire');
    }

    return joke.toJSON();
  }
  catch (error) {
    if (error instanceof NotFoundError || error instanceof DatabaseError) {
      throw error;
    }

    throw new DatabaseError('Erreur lors de la récupération de la blague aléatoire');
  }
}

export async function createJoke(jokeData: JokeCreationAttributes): Promise<JokeAttributes> {
  try {
    const newJoke = await Joke.create(jokeData);
    return newJoke.toJSON();
  }
  catch {
    throw new DatabaseError('Erreur lors de la création de la blague');
  }
}

export async function countJokes(): Promise<number> {
  try {
    return await Joke.count();
  }
  catch {
    throw new DatabaseError('Erreur lors du comptage des blagues');
  }
}
