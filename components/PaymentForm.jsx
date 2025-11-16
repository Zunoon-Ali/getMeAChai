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

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setTouched({ name: true, msg: true, payment: true });

    if (name.length < 3 || msg.length < 3 || payment.length < 2) return;

    // Process payment
    console.log({ name, msg, payment });
  };

  const handleAmountClick = (amount) => {
    setPayment(`$${amount}`);
    setTouched({ ...touched, payment: true }); // mark as touched
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
          {/* <span className="absolute left-2 top-2 text-white">$</span> */}
          <input
            type="text"
            id="payment"
            placeholder="Amount"
            className="w-full p-2 pl-6 rounded bg-slate-800 text-white"
            value={payment}
            onChange={(e) => setPayment(e.target.value.startsWith("$") ? e.target.value : `$${e.target.value}`)}
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
        className="px-4 py-2 bg-blue-500 rounded w-full font-bold"
      >
        Pay
      </button>
    </form>
  );
}
