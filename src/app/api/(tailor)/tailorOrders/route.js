import { connectDB } from "../../../../lib/db";
import Order from '../../../../models/orderModel';
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        await connectDB();
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const orders = await Order.find({ tailor: session.user.id }).populate("customer", "name email");
        return NextResponse.json(orders);
    } catch (error) {
        console.error("Error fetching tailor orders:", error);
        return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
    }
}
