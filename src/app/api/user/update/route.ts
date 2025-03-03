import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConfig from "@/middlewares/db.config";
import User from "@/model/User.model";

dbConfig();

export async function PUT(req: NextRequest) {
  try {
    const { updatedData } = await req.json();

    if (!updatedData.email) {
      return NextResponse.json(
        { message: "Email is required to update user data" },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await User.findOne({ email: updatedData.email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (updatedData.password) {
      if (updatedData.password.length < 8) {
        return NextResponse.json(
          { message: "Password must be at least 8 characters long" },
          { status: 400 }
        );
      }
      updatedData.password = await bcrypt.hash(updatedData.password, 10);
    }

    if (updatedData.profileImage) {
      user.profileImage = updatedData.profileImage;
    }

    user.name = updatedData.name || user.name;
    user.phone = updatedData.phone || user.phone;
    user.summary = updatedData.summary || user.summary;
    user.achievements = updatedData.achievements || user.achievements;
    user.atsScore = updatedData.atsScore || user.atsScore;
    user.certifications = updatedData.certifications || user.certifications;
    user.socialLinks = updatedData.socialLinks || user.socialLinks;
    user.education = updatedData.education || user.education;
    user.experience = updatedData.experience || user.experience;
    user.projects = updatedData.projects || user.projects;
    user.skills = updatedData.skills || user.skills;

    await user.save();

    return NextResponse.json(
      { message: "User profile updated successfully", user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
