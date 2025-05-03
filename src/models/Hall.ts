import mongoose, { Schema } from "mongoose";

export interface IHall extends Document {
  name: string;
  capacity: number;
  shortName: string;
  isActive: boolean;
}

const hallSchema = new Schema<IHall>({
  name: { type: String, required: true },
  capacity: { type: Number },
  shortName: {
    type: String,
    unique: true,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const Hall = mongoose.model<IHall>("Hall", hallSchema);

export default Hall;
