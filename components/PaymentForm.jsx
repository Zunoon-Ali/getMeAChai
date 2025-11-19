"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PaymentForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [payment, setPayment] = useState("");

  const [touched, setTouched] = useState({
    name: false,
    msg: false,
    payment: false,
  });

  const [loading, setLoading] = useState(false);

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  const handleAmountClick = (amount) => {
    setPayment(`$${amount}`);
    setTouched({ ...touched, payment: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouched({ name: true, msg: true, payment: true });

    if (name.length < 3 || msg.length < 3 || payment.length < 2) return;

    setLoading(true);

    try {
      // Send data to fake payment backend
      const res = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: name,
          message: msg,
          amount: payment.replace("$", ""),
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Payment saved successfully!"); // fake success
        router.push("/payment/success"); // redirect to success page
        setName("");
        setMsg("");
        setPayment("");
        setTouched({ name: false, msg: false, payment: false });
      } else {
        alert("Payment failed: " + data.error);
        router.push("/payment/fail"); // redirect to fail page
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong: " + err.message);
      router.push("/payment/fail");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group mb-4">
        <label htmlFor="name">Username</label>
        <input
          type="text"
          id="name"
          placeholder="Enter Username"
          className="w-full p-2 rounded bg-slate-800 text-white"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => handleBlur("name")}
        />
        {touched.name && name.length < 3 && (
          <span className="text-red-500 text-sm">Name is required</span>
        )}
      </div>

      <div className="form-group mb-4">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          rows={4}
          placeholder="Write your thoughts..."
          className="w-full p-2 rounded bg-slate-800 text-white"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onBlur={() => handleBlur("msg")}
        ></textarea>
        {touched.msg && msg.length < 3 && (
          <span className="text-red-500 text-sm">Message is required</span>
        )}
      </div>

      <div className="form-group mb-4">
        <label htmlFor="payment">Payment</label>
        <div className="relative">
          <input
            type="text"
            id="payment"
            placeholder="Amount"
            className="w-full p-2 pl-6 rounded bg-slate-800 text-white"
            value={payment}
            onChange={(e) =>
              setPayment(
                e.target.value.startsWith("$")
                  ? e.target.value
                  : `$${e.target.value}`
              )
            }
            onBlur={() => handleBlur("payment")}
          />
        </div>
        {touched.payment && payment.length < 2 && (
          <span className="text-red-500 text-sm">Payment is required</span>
        )}
      </div>

      <div className="flex gap-2 mb-4">
        {[10, 20, 30].map((amt) => (
          <button
            type="button"
            key={amt}
            className="px-3 py-1 bg-purple-600 rounded"
            onClick={() => handleAmountClick(amt)}
          >
            ${amt}
          </button>
        ))}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm w-full font-bold py-2.5"
      >
        {loading ? "Processing..." : "Pay"}
      </button>
    </form>
  );
}
