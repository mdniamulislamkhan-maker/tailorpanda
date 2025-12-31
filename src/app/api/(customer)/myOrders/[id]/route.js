
import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import Order from "../../../../../models/orderModel";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../lib/auth";

export async function GET(request, context) {
    
    const params = await context.params;
    const { id } = params;
    try {
        await connectDB();
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const order = await Order.findOne({ _id: id, customer: session.user.id }).populate("tailor", "name email");
        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }
        return NextResponse.json(order);
    } catch (error) {
        console.error("Error fetching order:", error);
        return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 });
    }
}
