import { Safepay } from "@sfpy/node-sdk";

const safepay = new Safepay({
  publicKey: "test_public_sec_ebdbea15-5153-440a-9a82-2b3614faa596",
  secretKey: "test_secret_bf4b0b8e48b8ce3b8006a77422fe5845b4e1e1c0325dd4388bddb2c07c8ca993",
  sandbox: true,
});

async function testPayment() {
  try {
    const tx = await safepay.payments.create({
      amount: 10,
      currency: "PKR",
      description: "Test payment",
      redirectUrl: "http://localhost:3000/payment/success",
      cancelUrl: "http://localhost:3000/payment/fail",
    });
    console.log("Sandbox Transaction:", tx);
  } catch (err) {
    console.error("Error:", err.message);
  }
}

testPayment();
