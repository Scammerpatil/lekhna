import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  profileImage?: string;
  summary?: string;
  skills: string[];
  experience: {
    company: string;
    role: string;
    location?: string;
    startDate: Date;
    endDate?: Date;
    description?: string;
  }[];
  education: {
    institution: string;
    degree: string;
    location?: string;
    startDate: Date;
    endDate?: Date;
  }[];
  certifications: {
    name: string;
    issuedBy: string;
    date: Date;
  }[];
  projects: {
    title: string;
    description: string;
    technologies: string[];
    links?: {
      github?: string;
      liveDemo?: string;
    };
  }[];
  atsScore?: number;
  socialLinks?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    portfolio?: string;
  };
  achievements?: string[];
}

const UserSchema: Schema = new Schema(
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
    phone: {
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
        company: { type: String, required: true },
        role: { type: String, required: true },
        location: { type: String },
        startDate: { type: Date, required: true },
        endDate: { type: Date },
        description: { type: String },
      },
    ],
    education: [
      {
        institution: { type: String, required: true },
        degree: { type: String, required: true },
        location: { type: String },
        startDate: { type: Date, required: true },
        endDate: { type: Date },
      },
    ],
    certifications: [
      {
        name: { type: String, required: true },
        issuedBy: { type: String, required: true },
        date: { type: Date, required: true },
      },
    ],
    projects: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        technologies: [{ type: String, required: true }],
        links: {
          github: { type: String },
          liveDemo: { type: String },
        },
      },
    ],
    atsScore: { type: Number, default: 0 },
    socialLinks: {
      linkedin: { type: String },
      github: { type: String },
      twitter: { type: String },
      portfolio: { type: String },
    },
    achievements: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
