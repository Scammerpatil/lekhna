import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default:
        "https://res.cloudinary.com/du8msdgbj/image/upload/v1631440717/avatars/avatar-1_rine9f.png",
    },
    summary: {
      type: String,
    },
    skills: [
      {
        type: String,
      },
    ],
    experience: [
      {
        company: String,
        role: String,
        startDate: Date,
        endDate: Date,
        description: String,
      },
    ],
    education: [
      {
        institution: String,
        degree: String,
        startDate: Date,
        endDate: Date,
      },
    ],
    certifications: [
      {
        name: String,
        issuedBy: String,
        date: Date,
      },
    ],
    projects: [
      {
        title: String,
        description: String,
        technologies: [String],
      },
    ],
    atsScore: { type: Number, default: 0 }, // Score after analysis
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
