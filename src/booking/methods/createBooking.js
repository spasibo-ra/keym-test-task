import wrap from "../../utils/wrap.mjs";
import BookingService from "../booking.service.js";

async function create(req, res, next) {
  const user = req.user;
  const params = req.body;
  const result = await BookingService.create(params, user.userId)
  res.locals = Object.assign({}, res.locals, {
    status: 201,
    result,
  });
  return next();
}

export const createBooking = wrap(create);
