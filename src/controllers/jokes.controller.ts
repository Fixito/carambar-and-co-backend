import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import * as JokesService from '../services/jokes.service.js';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

interface JokesListResponse {
  count: number;
  jokes: any[];
}

export async function getAllJokes(_req: Request, res: Response<ApiResponse<JokesListResponse>>) {
  const jokes = await JokesService.getAllJokes();
  const count = await JokesService.countJokes();

  res.json({
    success: true,
    data: {
      count,
      jokes,
    },
  });
}

export async function getRandomJoke(_req: Request, res: Response<ApiResponse>) {
  const joke = await JokesService.getRandomJoke();
  res.json({
    success: true,
    data: joke,
  });
}

export async function getJokeById(req: Request<{ id: string }>, res: Response<ApiResponse>) {
  const { id } = req.params;
  const joke = await JokesService.getJokeById(id);

  res.json({
    success: true,
    data: joke,
  });
}

export async function createJoke(req: Request, res: Response<ApiResponse>) {
  const { text, answer } = req.body;
  const newJoke = await JokesService.createJoke({ text, answer });

  res.status(StatusCodes.CREATED).json({
    success: true,
    data: newJoke,
    message: 'Blague créée avec succès',
  });
}
