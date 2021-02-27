import * as Joi from 'joi';

export const dbConfigSchema = {
  DB_MYSQL_HOST: Joi.string().required(),
  DB_MYSQL_PASSWORD: Joi.string().required(),
  DB_MYSQL_DATABASE: Joi.string().required(),
  DB_MYSQL_USER: Joi.string().required(),
  DB_MYSQL_PORT: Joi.number().required(),
};
