import { registersSchema } from '../schemas/registersSchema.js';

function registersMiddleware(req, res, next) {
  const { description, value, mode } = req.body;

  const isRegisterValid = registersSchema.validate({
    description,
    value,
    mode,
  });

  if (isRegisterValid.error) {
    return res.send(400);
  }

  if (
    mode.toLowerCase() !== 'entrada'&&
    mode.toLowerCase() !== 'saida'
  ) {
    return res.send(400);
  }

  next();

}

export { registersMiddleware };