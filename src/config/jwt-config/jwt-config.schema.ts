import * as Joi from 'joi';

export const jwtConfigSchema = {
  JWT_SECRET_KEY: Joi.string().required(),
  JWT_ACCESS_TOKEN_EXPIRED_SECOND: Joi.number().required(),
};
