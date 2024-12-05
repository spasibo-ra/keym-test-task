import wrap from "../../utils/wrap.mjs";
import BookingService from "../booking.service.js";

async function getById(req, res, next) {
  const params = req.params;
  const result = await BookingService.getById(params?.id);
  res.locals = Object.assign({}, res.locals, { 
    status: 200, 
    result
  });
  return next();
}

export const getBookingById = wrap(getById);
