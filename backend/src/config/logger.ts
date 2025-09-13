import winston from 'winston';

export const createLogger = () => {
  return winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.errors({ stack: true }),
      winston.format.colorize(),
      winston.format.printf((info) => {
        const { timestamp, level, message, stack } = info;
        return `${timestamp} [${level}]: ${message}${stack ? '\n' + stack : ''}`;
      })
    ),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ 
        filename: 'logs/error.log', 
        level: 'error' 
      }),
      new winston.transports.File({ 
        filename: 'logs/combined.log' 
      })
    ]
  });
};
