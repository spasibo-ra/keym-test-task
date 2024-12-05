import Joi from "joi";
import timeToMinutes from "../utils/timeToMinutes.js";

const pattern = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const createBookingSchema = Joi.object().keys({
  body: Joi.object()
    .keys({
      date: Joi.string().required(),
      startTime: Joi.string().pattern(pattern).required(),
      endTime: Joi.string().pattern(pattern).required(),
    })
    .custom((value, helpers) => {
      const { startTime, endTime } = value;
      const start = timeToMinutes(startTime);
      const end = timeToMinutes(endTime);

      if (start >= end) {
        return helpers.error("any.invalid", {
          message: "startTime must be earlier than endTime",
          invalids: [start]
        });
      }
      return value;
    }),
});
