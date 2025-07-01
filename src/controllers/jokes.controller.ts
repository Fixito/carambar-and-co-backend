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
  try {
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
  catch {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: 'Erreur lors de la récupération des blagues',
    });
  }
}

export async function getRandomJoke(_req: Request, res: Response<ApiResponse>) {
  try {
    const joke = await JokesService.getRandomJoke();
    res.json({
      success: true,
      data: joke,
    });
  }
  catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
    res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      error: errorMessage,
    });
  }
}

export async function getJokeById(req: Request<{ id: string }>, res: Response<ApiResponse>) {
  try {
    const { id } = req.params;
    const joke = await JokesService.getJokeById(id);

    if (!joke) {
      res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        error: `Blague avec l'ID ${id} introuvable`,
      });
      return;
    }

    res.json({
      success: true,
      data: joke,
    });
  }
  catch {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: 'Erreur lors de la récupération de la blague',
    });
  }
}

export async function createJoke(req: Request, res: Response<ApiResponse>) {
  try {
    const { text, answer } = req.body;

    if (!text || !answer) {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        error: 'Les champs "text" et "answer" sont obligatoires',
      });
      return;
    }

    const newJoke = await JokesService.createJoke({ text, answer });

    res.status(StatusCodes.CREATED).json({
      success: true,
      data: newJoke,
      message: 'Blague créée avec succès',
    });
  }
  catch {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: 'Erreur lors de la création de la blague',
    });
  }
}
