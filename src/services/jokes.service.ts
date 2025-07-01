import type { JokeAttributes, JokeCreationAttributes } from '../models/jokes.model.js';
import { Joke } from '../models/jokes.model.js';

export async function getAllJokes(): Promise<JokeAttributes[]> {
  const jokes = await Joke.findAll();
  return jokes.map(joke => joke.toJSON());
}

export async function getJokeById(id: string): Promise<JokeAttributes | null> {
  const joke = await Joke.findByPk(id);
  return joke ? joke.toJSON() : null;
}

export async function getRandomJoke(): Promise<JokeAttributes> {
  const count = await Joke.count();

  if (count === 0) {
    throw new Error('Aucune blague disponible');
  }

  const randomOffset = Math.floor(Math.random() * count);
  const joke = await Joke.findOne({
    offset: randomOffset,
  });

  if (!joke) {
    throw new Error('Erreur lors de la récupération de la blague aléatoire');
  }

  return joke.toJSON();
}

export async function createJoke(jokeData: JokeCreationAttributes): Promise<JokeAttributes> {
  const newJoke = await Joke.create(jokeData);
  return newJoke.toJSON();
}

export async function countJokes(): Promise<number> {
  return await Joke.count();
}
