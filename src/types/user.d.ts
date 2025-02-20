import mongoose from "mongoose";

export interface User {
  _id?: mongoose.Schema.Types.ObjectId;
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
