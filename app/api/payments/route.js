import Payment from "@/models/Payment";
import connectDB from "@/db/connectDb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const { username, amount, message, to_user } = await req.json();

    // FAKE PAYMENT RESULT
    const success = true; // always succeed (or add random fail)

    if (!to_user) {
      return NextResponse.json(
        { success: false, error: "to_user is required" },
        { status: 400 }
      );
    }

    // Save to database
    const payment = await Payment.create({
      oid: `OID_${Date.now()}`, // fake order id
      to_user: to_user, // actual recipient username
      name: username, // user entered name
      message,
      amount: Number(amount),
      done: true, // mark as completed so it shows up in the list
      createdAt: new Date(),
    });

    console.log("✅ Payment saved:", payment);

    return NextResponse.json({ success: true, payment }, { status: 200 });
  } catch (err) {
    console.error("❌ Fake Payment Error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
