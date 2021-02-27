import * as Joi from 'joi';

export const appConfigSchema = {
  APP_URL: Joi.string().default('localhost'),
  APP_PORT: Joi.number().default(3456),
  APP_ENV: Joi.valid('development', 'production').default('development'),
};
