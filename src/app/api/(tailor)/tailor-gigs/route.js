import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import TailorGig from '../../../../models/tailorgigModel'
import { connectDB } from '../../../../lib/db';
import { authOptions } from '../../../../lib/auth';

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "tailor") {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { title, description, price, deliveryTime, revisions } = body;

    if (!title || !description || !price || !deliveryTime || !revisions) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const gig = await TailorGig.create({
      title,
      description,
      price,
      deliveryTime,
      revisions,
      tailor: session.user.id,
    });

    return NextResponse.json(gig, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create gig" },
      { status: 500 }
    );
  }
}

/* ================= GET MY GIGS ================= */
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "tailor") {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  await connectDB();

  const gigs = await TailorGig.find({
    tailor: session.user.id,
  }).sort({ createdAt: -1 });

  return NextResponse.json(gigs);
}
