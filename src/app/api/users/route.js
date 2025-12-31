import { NextResponse } from "next/server";
import userModel from "@/models/userModel";
import { connectDB } from "@/lib/db";

export async function GET() {
  await connectDB();

  const users = await userModel.find();
  return NextResponse.json(users);
}
