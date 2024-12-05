import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.SchemaTypes.ObjectId, ref: "User", require: true },
    date: { type: mongoose.SchemaTypes.Date, require: true },
    startTime: { type: String, require: true },
    endTime: { type: String, require: true },
    start: { type: Number, require: true },
    end: { type: Number, require: true },
  },
  { versionKey: false }
);

const populateOptions = {
  path: "user",
  select: "login -_id",
  transform: (doc) => (doc === null ? null : doc.login),
};

const selectData = ["date", "startTime", "endTime"];

bookingSchema.pre("find", function (next) {
  this.select(selectData);
  this.populate(populateOptions);
  next();
});

bookingSchema.pre("findOne", function (next) {
  this.select(selectData);
  this.populate(populateOptions);
  next();
});

const BookingModel = mongoose.model("Booking", bookingSchema);
export default BookingModel;
