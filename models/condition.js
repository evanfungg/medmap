import mongoose, { Schema } from "mongoose";

// needs to change!
const conditionSchema = new Schema(
    {
    name: { type: String, required: true },
    medications: { type: [medicationSchema], required: true },

    // can be deleted if not needed
    created: { type: Date, default: Date.now }
    },
    {
    timestamps: true,
    }
);

const medicationSchema = new Schema(
    {
    name: String,
    isEffective: [Boolean]
  });

const Condition = mongoose.models.condition ||mongoose.model("condition", conditionSchema);

export default Condition;