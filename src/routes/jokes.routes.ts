import { Router } from 'express';

import * as JokesController from '../controllers/jokes.controller.js';

const router = Router();

router.route('/').get(JokesController.getAllJokes).post(JokesController.createJoke);

router.get('/random', JokesController.getRandomJoke);

router.get('/:id', JokesController.getJokeById);

export default router;
