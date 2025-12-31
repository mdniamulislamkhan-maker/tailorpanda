import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../lib/auth";
import { connectDB } from "../../../../../lib/db";
import TailorGig from "../../../../../models/tailorgigModel";

/* ================= UPDATE GIG ================= */
export async function PUT(req, context) {
  const params = await context.params; 
  const { id } = params;

  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "tailor") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const body = await req.json();

  const gig = await TailorGig.findOneAndUpdate(
    { _id: id, tailor: session.user.id }, 
    body,
    { new: true }
  );

  if (!gig) {
    return NextResponse.json({ message: "Gig not found" }, { status: 404 });
  }

  return NextResponse.json(gig);
}

/* ================= DELETE GIG ================= */
export async function DELETE(req, context) {
  const params = await context.params; 
  const { id } = params;

  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "tailor") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const gig = await TailorGig.findOneAndDelete({
    _id: id,
    tailor: session.user.id,
  });

  if (!gig) {
    return NextResponse.json({ message: "Gig not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Gig deleted successfully" });
}
