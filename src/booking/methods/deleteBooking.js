import wrap from "../../utils/wrap.mjs";
import BookingService from "../booking.service.js";

async function deleteHandler(req, res, next) {
  const params = req.params;
  const user = req.user;
  await BookingService.delete(params?.id, user.userId);
  res.locals = Object.assign({}, res.locals, { status: 204 });
  return next();
}

export const deleteBooking = wrap(deleteHandler);