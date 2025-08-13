import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const motoSchema = new mongoose.Schema(
  {
    owner: { type: ObjectId, ref: "User" },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    pricePerDay: { type: Number, required: true },
    category: { type: String, required: true },
    displacement: { type: String, required: true },
    transmission: { type: String, required: true },
    description: { type: String, required: true },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Moto = mongoose.model("Moto", motoSchema);

export default Moto;
