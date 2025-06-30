import { Router } from 'express';

import * as jokesController from '../controllers/jokes.controller.js';

const router = Router();

router.route('/').get(jokesController.getAllJokes).post(jokesController.createJoke);

router.route('/random').get(jokesController.getRandomJoke);

router.route('/:id').get(jokesController.getJokeById);

export default router;
