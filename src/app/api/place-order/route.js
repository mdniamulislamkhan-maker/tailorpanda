import { NextResponse } from "next/server";
import {connectDB} from "../../../lib/db";
import Order from "../../../models/orderModel";
import { getServerSession } from "next-auth";
import {authOptions} from "../../../lib/auth";

export async function POST(req) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();


    console.log(body)

    console.log(session.user)

    const order = await Order.create({
      customer: session.user.id,
      tailor: body.tailor,
      gig: body.gig,
      orderDetails: body.orderDetails,
      phone: body.phone,
      address: body.address,
      totalPrice: body.totalPrice,
      customerNote: body.customerNote,
    });

    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    
    console.log(error);
    console.log(error.message);

    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}
