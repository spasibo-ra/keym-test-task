export function responseHandler(req, res, next) {
  const { result } = res.locals;
  const status = res.locals?.status || 200;

  res.status(status);
  if (result) {
    res.json(result);
    return res.end();
  }
  if (status === 204) {
    return res.sendStatus(204);
  }
  return next();
}
