"use server";
import connectDb from "@/db/connectDb";
import Payment from "@/models/Payment";
import { Safepay } from "@sfpy/node-sdk";

export async function POST(req) {
  await connectDb();

  try {
    const { username, amount, message } = await req.json();

    if (!username || !amount) {
      return new Response(
        JSON.stringify({ error: "Username and amount required" }),
        { status: 400 }
      );
    }

    const safepay = new Safepay({
      publicKey: process.env.SAFEPAY_PUBLIC_KEY,
      secretKey: process.env.SAFEPAY_SECRET_KEY,
      env: "sandbox",
    });

    // Create a transaction
    const transaction = safepay.createTransaction({
      amount: Number(amount),
      currency: "PKR",
      merchantRef: `T${Date.now()}`,
      description: message,
      // optional: add return & response URLs
      url_return: "https://your-dev-url.com/return",
      url_response: "https://your-dev-url.com/response",
    });

    // Save transaction in MongoDB
    const paymentDoc = await Payment.create({
      username,
      amount,
      message,
      status: "pending",
      transaction_id: transaction.hash(), // Safepay transaction hash
    });

    return new Response(
      JSON.stringify({
        success: true,
        payment: paymentDoc,
        transaction: {
          hash: transaction.hash(),
          payment_url: transaction.publish(), // Safepay sandbox URL
        },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Payment API Error:", err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
