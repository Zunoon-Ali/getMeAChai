import Payment from "@/models/Payment";
import connectDB from "@/db/connectDb";

export async function POST(req) {
  try {
    await connectDB();

    const { username, amount, message } = await req.json();

    // FAKE PAYMENT RESULT
    const success = true; // always succeed (or add random fail)

    // Save to database
    const payment = await Payment.create({
      oid: `OID_${Date.now()}`, // fake order id
      to_user: "admin", // fake recipient
      name: username, // user entered name
      message,
      amount: Number(amount),
      status: success ? "success" : "failed",
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({ success: true, payment }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Fake Payment Error:", err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }
}
