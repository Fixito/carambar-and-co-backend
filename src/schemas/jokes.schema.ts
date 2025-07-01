import { z } from 'zod';

export const createJokeSchema = z.object({
  text: z
    .string()
    .min(1, 'Le texte de la blague est obligatoire'),
  answer: z
    .string()
    .min(1, 'La réponse est obligatoire'),
});

export const jokeParamsSchema = z.object({
  id: z.string().uuid('ID invalide'),
});

export type CreateJokeInput = z.infer<typeof createJokeSchema>;
export type JokeParams = z.infer<typeof jokeParamsSchema>;
