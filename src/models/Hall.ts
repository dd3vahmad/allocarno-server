import mongoose, { Schema } from "mongoose";

export interface IHall extends Document {
  name: string;
  shortName: string;
}

const hallSchema = new Schema<IHall>({
  name: { type: String, required: true },
  shortName: {
    type: String,
    unique: true,
    required: true,
  },
});

const Hall = mongoose.model<IHall>("Hall", hallSchema);

export default Hall;
