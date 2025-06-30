import type { Request, Response } from 'express';

export function getAllJokes(_req: Request, res: Response) {
  res.send('get all jokes');
}

export function createJoke(_req: Request, res: Response) {
  res.send('create joke');
}

export function getJokeById(_req: Request, res: Response) {
  res.send('get joke by id');
}

export function getRandomJoke(_req: Request, res: Response) {
  res.send('get random joke');
}
