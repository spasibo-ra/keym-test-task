import { HttpError } from "../utils/httpError.js";

const requestValidate = (schema) => async (req, res, next) => {
  try {
    const data = await schema.validateAsync(req, {
      stripUnknown: {
        arrays: false,
        objects: true,
      },
      convert: true,
      abortEarly: false,
    });
    res.locals = Object.assign({}, res.locals, data);
    return next();
  } catch (err) {
    const details = err?.details[0];
    return next(
      new HttpError(
        400,
        `Bad request - validation failed: ${details.message} ${details.context.message ?? ''}`
      )
    );
  }
};

export default requestValidate;