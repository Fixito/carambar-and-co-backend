import type { Application } from 'express';
import process from 'node:process';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

// Rate limiting global
export const globalRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes par défaut
  max: 100, // Max 100 requêtes par IP par fenêtre
  message: {
    success: false,
    error: 'Trop de requêtes. Veuillez réessayer plus tard.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiting strict pour les endpoints sensibles
export const strictRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Max 10 requêtes par IP
  message: {
    success: false,
    error: 'Trop de tentatives. Veuillez réessayer dans 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiting pour les créations
export const createRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute par défaut
  max: 5, // Max 5 créations par minute
  message: {
    success: false,
    error: 'Trop de créations. Veuillez patienter 1 minute.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const corsConfig = {
  origin: process.env.NODE_ENV === 'production'
    ? (process.env.ALLOWED_ORIGINS?.split(',') || []) // Domaines depuis les variables d'environnement
    : ['http://localhost:3000', 'http://localhost:5173'], // Domaines de dev
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400, // 24h cache pour preflight
};

export function applySecurity(app: Application) {
  app.use(helmet());
  app.use(globalRateLimit);
}
