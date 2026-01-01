import User from "@/lib/models/User";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    console.log(id);
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Missing ID" },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findById(id).lean();

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const userData = {
      id: user._id.toString(),
      email: user.email,
      name: user.name, // not email
      profileImage: user.image?.trim(),
      role: user.role,
    };

    return NextResponse.json(userData, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
