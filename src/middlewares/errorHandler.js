export function errorHandler(error, req, res) {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  res.status(status).send({ status, message });
}
