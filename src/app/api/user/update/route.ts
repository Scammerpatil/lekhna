import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConfig from "@/middlewares/db.config";
import User from "@/model/User.model";

dbConfig();

export async function PATCH(req: NextRequest) {
  try {
    const { formData } = await req.json();

    // Find user by email
    const user = await User.findOne({ email: formData.email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const updateUser = await User.findOneAndUpdate(
      { email: formData.email },
      formData,
      {
        new: true,
      }
    );
    await updateUser.save();

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
