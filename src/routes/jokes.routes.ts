import { Router } from 'express';

import * as JokesController from '../controllers/jokes.controller.js';
import { validateBody, validateParams } from '../middlewares/validation.middleware.js';
import { createJokeSchema, jokeParamsSchema } from '../schemas/jokes.schema.js';

const router = Router();

router.get('/', JokesController.getAllJokes);

router.post('/', validateBody(createJokeSchema), JokesController.createJoke);

router.get('/random', JokesController.getRandomJoke);

router.get('/:id', validateParams(jokeParamsSchema), JokesController.getJokeById);

export default router;
