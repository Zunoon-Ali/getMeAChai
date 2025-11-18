"use client";

import { useState } from "react";

export default function PaymentForm() {
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
    setTouched({ ...touched, payment: true }); // mark as touched
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouched({ name: true, msg: true, payment: true });

    if (name.length < 3 || msg.length < 3 || payment.length < 2) return;

    setLoading(true);

    try {
      // Send data to backend API
      const res = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: name,
          message: msg,
          amount: payment.replace("$", ""),
        }),
      });

      // Check content type
      const contentType = res.headers.get("content-type");
      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();
        console.error("Non-JSON response:", text);
        alert("Payment failed: see console for details");
        setLoading(false);
        return;
      }

      console.log("Payment Response:", data);

      if (data.success) {
        alert("Payment saved in DB! Opening Safepay sandbox...");

        // Open Safepay sandbox payment page in new tab
        if (data.transaction?.payment_url) {
          window.open(data.transaction.payment_url, "_blank");
        } else {
          console.warn("No payment URL returned from backend.");
        }

        // Reset form
        setName("");
        setMsg("");
        setPayment("");
        setTouched({ name: false, msg: false, payment: false });
      } else {
        alert("Payment failed: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong: " + err.message);
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
          rows="4"
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
        className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 px-4 py-2 bg-blue-500 rounded w-full font-bold"
      >
        {loading ? "Processing..." : "Pay"}
      </button>
    </form>
  );
}
