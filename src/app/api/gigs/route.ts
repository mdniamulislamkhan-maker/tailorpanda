// app/api/gigs/route.js
import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import TailorGig from '../../../models/tailorgigModel';

export async function GET() {
  try {
    await connectDB();

    const gigs = await TailorGig.find().populate("tailor", "name email");

    return NextResponse.json(gigs, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to fetch gigs" }, { status: 500 });
  }
}
