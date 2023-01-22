import { registersSchema } from '../schemas/registersSchema.js';

function registersMiddleware(req, res, next) {
  const { description, value, mode } = req.body;

  const isRegisterValid = registersSchema.validate({
    description,
    value,
    mode,
  });

  if (isRegisterValid.error) {
    //STATUS_CODE: BAD_REQUEST
    return res.send(400);
  }

  if (
    mode !== 'entrada'&&
    mode !== 'saida'
  ) {
    //STATUS_CODE: BAD_REQUEST
    return res.send(400);
  }

  next();

}

export { registersMiddleware };