import { HttpError } from "../utils/httpError.js";
import timeToMinutes from "../utils/timeToMinutes.js";
import BookingModel from "./booking.model.js";

class BookingService {
  static async getAll(pagination) {
    const { limit, skip } = pagination;
    const data = await BookingModel.find().skip(skip).limit(limit).lean();
    const totalCount = await BookingModel.countDocuments();
    return { data, totalCount };
  }

  static async getById(_id) {
    const result = await BookingModel.findOne({ _id }).lean();
    return result;
  }

  static async create(params, userId) {
    const { date, startTime, endTime } = params;

    const start = timeToMinutes(startTime);
    const end = timeToMinutes(endTime);

    const exist = await BookingModel.findOne({
      date,
      $or: [
        { $and: [{ start: { $lte: end } }, { end: { $gte: end } }] },
        { $and: [{ start: { $lte: start } }, { end: { $gte: start } }] },
      ],
    });

    if (exist) throw new HttpError(400, "This slot is booked");
    const { _id } = await BookingModel.create({
      user: userId,
      date,
      startTime,
      endTime,
      start,
      end,
    });
    return await BookingModel.findOne({ _id }).lean();
  }

  static async delete(_id, userId) {
    await BookingModel.findOneAndDelete({ _id, user: userId });
  }
}

export default BookingService;
