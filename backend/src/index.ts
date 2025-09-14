// Load environment variables first, before any other imports
import dotenv from 'dotenv';
const result = dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { createLogger } from './config/logger.js';
import { rateLimitMiddleware } from './middleware/rateLimit.js';
import { errorHandler } from './middleware/errorHandler.js';
import { deepseekRoutes } from './routes/deepseek.js';
import { projectRoutes } from './routes/project.js';
import { codeRoutes } from './routes/code.js';

const app = express();
const logger = createLogger();
const PORT = process.env.PORT || 3001;

// Debug environment loading
logger.info('Environment loading result:', result);
logger.info('NODE_ENV:', process.env.NODE_ENV);
logger.info('DEEPSEEK_API_KEY exists:', !!process.env.DEEPSEEK_API_KEY);
logger.info('PORT:', process.env.PORT);

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://api.deepseek.com"]
    }
  }
}));

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
app.use(rateLimitMiddleware);

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0'
  });
});

// API routes
app.use('/api/deepseek', deepseekRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/code', codeRoutes);

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  logger.info(`🚀 Agent AI IDE Backend server running on port ${PORT}`);
  logger.info(`📖 API documentation available at http://localhost:${PORT}/api/docs`);
});

export default app;
