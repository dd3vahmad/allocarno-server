import mongoose, { Schema } from "mongoose";
import cloudinary from "../lib/cloudinary";

const AVATAR_STYLES = [
  "micah",
  "avataaars",
  "open-peeps",
  "big-smile",
  "adventurer",
];
const AVATAR_BACKGROUNDS = ["ffdfbf", "ffd5dc", "d1d4f9", "c0aede", "b6e3f4"];

export interface ISchool extends Document {
  id: Schema.Types.ObjectId;
  name: string;
  address: string;
  email: string;
  logo: string;
  motto: string;
  cloudinaryId: string | null;
  category: "college" | "secondary" | "primary" | "university" | "polytechnic";
  phone?: string;
  createdAt: Date;
  updatedAt: Date;

  // Methods
  comparePassword(candidatePassword: string): Promise<boolean>;
  getPublicProfile(): Promise<Partial<ISchool> & { name?: string }>;
  generateAuthToken(): string;
  resetPassword(newPassword: string): Promise<void>;
}

const schoolSchema = new Schema<ISchool>(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    motto: {
      type: String,
    },
    logo: {
      type: String,
    },
    cloudinaryId: {
      type: String,
      default: null,
    },
    category: {
      type: String,
      enum: ["college", "secondary", "primary", "university", "polytechnic"],
      required: true,
    },
    phone: {
      type: String,
      default: "member",
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_, ret) => {
        delete ret.password;
        return ret;
      },
    },
  }
);

/**
 * Generate a random avatar for new Schools
 */
schoolSchema.pre("save", function (next) {
  if (!this.isNew || this.logo) return next();

  try {
    const randomStyle =
      AVATAR_STYLES[Math.floor(Math.random() * AVATAR_STYLES.length)];
    const randomBackground =
      AVATAR_BACKGROUNDS[Math.floor(Math.random() * AVATAR_BACKGROUNDS.length)];
    const seed = this._id.toString();
    this.logo = `https://api.dicebear.com/7.x/${randomStyle}/svg?seed=${seed}&backgroundColor=${randomBackground}`;
  } catch (error) {
    console.error("Error generating avatar:", error);
    this.logo = `https://api.dicebear.com/7.x/adventurer/svg?seed=${this._id.toString()}&backgroundColor=b6e3f4`;
  }
  next();
});

/**
 * Handle logo uploads
 */
schoolSchema.pre("save", async function (next) {
  if (!this.isModified("logo")) return next();

  try {
    if (this.logo?.startsWith("data:image")) {
      if (this.cloudinaryId) {
        try {
          await cloudinary.uploader.destroy(this.cloudinaryId);
        } catch (error) {
          console.error("Error deleting old profile image:", error);
        }
      }

      const publicId = `logos/${this._id}_${Date.now()}`;

      const uploadResponse = await cloudinary.uploader.upload(this.logo, {
        public_id: publicId,
        folder: "logos",
        overwrite: true,
        resource_type: "image",
        transformation: [
          { width: 400, height: 400, crop: "limit" },
          { quality: "auto" },
        ],
      });

      this.logo = uploadResponse.secure_url;
      this.cloudinaryId = uploadResponse.public_id;
    }
    next();
  } catch (error) {
    console.error("Error uploading logo:", error);
    const randomStyle =
      AVATAR_STYLES[Math.floor(Math.random() * AVATAR_STYLES.length)];
    this.logo = `https://api.dicebear.com/7.x/${randomStyle}/svg?seed=${this._id.toString()}&backgroundColor=b6e3f4`;
    this.cloudinaryId = null;
    next();
  }
});

/**
 * Get public profile for the School
 */
schoolSchema.methods.getPublicProfile = async function (): Promise<
  Partial<ISchool> & { name?: string }
> {
  return {
    id: this._id,
    name: this.name,
    motto: this.motto,
    email: this.email,
    logo: this.logo,
    address: this.address,
    phone: this.phone,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

const School = mongoose.model<ISchool>("School", schoolSchema);

export default School;
