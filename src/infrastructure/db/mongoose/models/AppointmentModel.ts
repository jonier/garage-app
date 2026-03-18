import { Schema, model, models } from "mongoose";

const AppointmentSchema = new Schema(
  {
    businessId: { type: Schema.Types.ObjectId, ref: "Business", required: true, index: true },
    date: { type: String, required: true, trim: true, match: /^\d{4}-\d{2}-\d{2}$/ },
    time: { type: String, required: true, trim: true, match: /^([01]\d|2[0-3]):[0-5]\d$/ },
    customer: { type: String, required: true, trim: true, maxlength: 120 },
    service: { type: String, required: true, trim: true, maxlength: 120 },
    notes: { type: String, trim: true, maxlength: 500, default: "" },
  },
  { timestamps: true }
);

AppointmentSchema.index({ businessId: 1, date: 1, time: 1 });

export const AppointmentModel =
  models.Appointment ?? model("Appointment", AppointmentSchema);
