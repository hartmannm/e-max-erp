import dotenv from 'dotenv';
import { ProfilesValues } from './profiles/profiles-values';

// Caso o perfil não esteja definido nas variáveis de ambiente, define como 'development'
process.env.NODE_ENV = process.env.NODE_ENV || ProfilesValues.DEVELOPMENT;

const environment = dotenv.config();
if (environment.error) {
  throw new Error('Não foi possível encontrar o arquivo .env');
}

export default {

  port: parseInt(process.env.PORT, 10),
  profile: process.env.NODE_ENV?.trim() || ProfilesValues.DEVELOPMENT

}
