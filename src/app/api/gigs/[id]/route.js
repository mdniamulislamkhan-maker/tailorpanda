import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import TailorGig from "../../../../models/tailorgigModel";

export async function GET(req, context) {
    try {

        const params = await context.params;
        const { id } = params;

        await connectDB();

        const gig = await TailorGig.findById(id).populate("tailor", "name email");

        if (!gig) {
            return NextResponse.json({ message: "Gig not found" }, { status: 404 });
        }

        return NextResponse.json(gig, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Failed to fetch gig" }, { status: 500 });
    }
}
