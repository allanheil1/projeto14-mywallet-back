import joi from 'joi';

const registerSchema = joi.object({
  value: joi.number().required(),
  description: joi.string().required(),
  mode: joi.string().required(),
});

export { registerSchema };