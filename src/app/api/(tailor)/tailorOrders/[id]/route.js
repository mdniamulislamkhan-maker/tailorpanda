import { connectDB } from "../../../../../lib/db";
import Order from '../../../../../models/orderModel';
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../lib/auth";
import { NextResponse } from "next/server";

export async function GET(request, context) {

    const params = await context.params;
    const { id } = params;

    try {
        await connectDB();
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const order = await Order.findById(id).populate("customer", "name email");

        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }
        return NextResponse.json(order);
    } catch (error) {
        console.error("Error fetching tailor orders:", error);
        return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
    }
}


export async function PATCH(request, context) {
    const params = await context.params;
    const { id } = params;
    try {
        await connectDB();
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const body = await request.json();
        console.log(body)
        const field = body.field;
        const value = body.value;

        if (field == "status") {
            const order = await Order.findOneAndUpdate(
                { _id: id, tailor: session.user.id },
                {
                    $set: { status: value }
                },
                { new: true }
            ).populate("customer", "name email");
            if (!order) {
                return NextResponse.json({ error: "Order not found or you're not authorized to update it" }, { status: 404 });
            }
        }
        else if (field == "orderDetails"){
            const order = await Order.findOneAndUpdate(
                { _id: id, tailor: session.user.id },
                {
                    $set: { orderDetails: value }
                },
                { new: true }
            ).populate("customer", "name email");
        }
        else if (field == "totalPrice"){
            const order = await Order.findOneAndUpdate(
                { _id: id, tailor: session.user.id },
                {
                    $set: { totalPrice: value }
                },
                { new: true }
            ).populate("customer", "name email");
            
        }

        return NextResponse.json({ message: "Update functionality is under construction." }, { status: 200 });
s
    } catch (error) {
        console.error("Error updating order:", error);
        return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
    }
}
