// test-logger.js (actualizado)
require('dotenv').config();

// Debug: verificar variables
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('LOG_LEVEL:', process.env.LOG_LEVEL);

const logger = require('./src/utils/logger');

console.log('\n=== Probando Crisálida Logger ===');
logger.info('🦋 Crisálida system starting', { component: 'logger' });
logger.debug('Debug info - User roadmap progress', { userId: 'test-123', progress: 75 });
logger.warn('Low XP reward detected', { task: 'quiz-1', xp: 5 });
logger.error('Failed to create roadmap', new Error('Database connection failed'));