import joi from 'joi';

const signUpSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required()
});

const signInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});

export { signUpSchema, signInSchema }