import dotenv from 'dotenv';
import path from 'path';
import { ProfilesValues } from './profiles/profiles-values';

// Caso o perfil não esteja definido nas variáveis de ambiente, define como 'development'
process.env.NODE_ENV = process.env.NODE_ENV || ProfilesValues.DEVELOPMENT;

const environment = dotenv.config();
if (environment.error) {
  throw new Error('Não foi possível encontrar o arquivo .env');
}

export default {

  port: parseInt(process.env.PORT, 10),
  profile: process.env.NODE_ENV?.trim() || ProfilesValues.DEVELOPMENT,
  dbHost: process.env.DB_HOST.trim(),
  dbPort: parseInt(process.env.DB_PORT, 10),
  dbUsername: process.env.DB_USERNAME.trim(),
  dbPassword: process.env.DB_PASSWORD.trim(),
  dbName: process.env.DB_NAME.trim(),
  dbPoolSize: process.env.DB_POOLSIZE ? parseInt(process.env.DB_POOLSIZE, 10) : 10,
  sessionSecret: process.env.SESSION_SECRET.trim(),
}
