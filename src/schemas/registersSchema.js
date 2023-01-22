import joi from 'joi';

const registersSchema = joi.object({
  value: joi.number().required(),
  description: joi.string().required(),
  mode: joi.string().required(),
});

export { registersSchema };