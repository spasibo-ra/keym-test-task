export function notFoundHandler(req, res) {
  const message = { error: "Resource not found" };
  res.status(404).send(message);
}
