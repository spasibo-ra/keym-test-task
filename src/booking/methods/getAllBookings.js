import wrap from "../../utils/wrap.mjs";
import BookingService from "../booking.service.js";

async function getAll(req, res, next) {
  const pagination = req.pagination;
  const result = await BookingService.getAll(pagination);
  res.locals = Object.assign({}, res.locals, { 
    status: 200,
    result 
  });
  return next();
}

export const getAllBookings = wrap(getAll);
