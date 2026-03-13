import { Schema, model, models } from "mongoose";

const BusinessSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    ownerName: { type: String, required: true, trim: true, maxlength: 120 },
    phone: { type: String, required: true, trim: true, maxlength: 30 },
    businessEmail: { type: String, required: true, lowercase: true, trim: true, maxlength: 120 },

    formattedAddress: { type: String, required: true, trim: true, maxlength: 200 },
    street: { type: String, required: true, trim: true, maxlength: 120 },
    city: { type: String, required: true, trim: true, maxlength: 80 },
    province: { type: String, required: true, trim: true, maxlength: 80 },
    country: { type: String, required: true, trim: true, maxlength: 80 },
    postalCode: { type: String, required: true, trim: true, maxlength: 20 },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },

    ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

export const BusinessModel = models.Business ?? model("Business", BusinessSchema);
