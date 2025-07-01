import type { Model, ModelDefined, Optional } from 'sequelize';
import { DataTypes } from 'sequelize';
import sequelize from '../db/index.js';

export interface JokeAttributes {
  id: string;
  text: string;
  answer: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface JokeCreationAttributes extends Optional<JokeAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export const Joke: ModelDefined<JokeAttributes, JokeCreationAttributes> = sequelize.define(
  'Joke',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Le texte de la blague ne peut pas être vide',
        },
      },
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'La réponse ne peut pas être vide',
        },
      },
    },
  },
);

export type JokeInstance = Model<JokeAttributes, JokeCreationAttributes>;
