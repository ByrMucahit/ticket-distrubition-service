import getEnv from '../helpers/getEnv';

const ALLOWED_ORIGINS = getEnv('ALLOWED_ORIGINS');

export const ALLOWED_ORIGINS_ARRAY = ALLOWED_ORIGINS ? ALLOWED_ORIGINS.split(',') : [];
