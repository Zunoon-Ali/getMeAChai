"use client";
import React from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";
import PaymentForm from "@/components/PaymentForm";

const PaymentPage = ({ trimUsername, payment = [], user }) => {
  console.log("💳 PaymentPage received payment prop:", payment);
  console.log("💳 Payment is array?", Array.isArray(payment));
  console.log("💳 Payment length:", payment?.length);
  const router = useRouter();

  return (
    <>
      <div className="cover w-full relative">
        <img
          src={user?.profilePic}
          alt="banner"
          className="w-full object-cover h-[320px] object-contain md:object-cover"
        />
        <div className="profile-img">
          <img
            src={user?.coverPic}
            alt="profile"
            className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full border-4 border-white object-cover object-position-center"
          />
        </div>
      </div>

      <div className="profile-info flex items-center justify-center flex-col w-full">
        <div className="info mx-auto mt-24 mb-10 text-center">
          <h2 className="text-xl font-bold text-slate-200 capitalize">
            {trimUsername}
          </h2>
          <h5 className="text-slate-600">
           lets help {trimUsername} to get a chai !
          </h5>

          <div className="stats flex items-center justify-center gap-4">
            <span className="font-bold text-xs text-slate-400">
              • {payment.length} Payments
            </span>
            <span className="font-bold text-xs text-slate-400">
              • {payment.reduce((total, payment) => total + payment.amount, 0)}{" "}
              raised
            </span>
            <span className="font-bold text-xs text-slate-400">
              {/* • ${totalAmount}/release */}
            </span>
          </div>
        </div>

        <div className="payment-info flex items-stretch justify-center gap-6 mt-4 w-[90%] flex-col md:flex-row">
          {/* Left Support Box */}
          <div className="support flex-1 bg-slate-900 p-6 rounded-lg flex flex-col justify-between w-full md:w-1/2">
            <h2 className="text-lg font-bold mb-4">Support</h2>
            <ul className="flex-1 flex flex-col gap-2 text-white">
              {payment.length === 0 && (
                <li className="text-center text-slate-400">
                  No payments yet
                </li>
              )}
              {payment.map((p) => {
                return (
                  <li key={p._id}>
                    <div className="my-2 flex items-center">
                      <img
                        src="/assets/avatar.gif"
                        alt="avatar"
                        width={30}
                        className="mr-2 rounded-full"
                      />

                      <span className="text-sm leading-5">
                        <span className="text-lg font-semibold">{p.name}</span>{" "}
                        donated <strong className="text-md">${p.amount}</strong>{" "}
                        with a message:{" "}
                        <span className="italic">" {p.message}. "</span>
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right Payment Box */}
          <div className="makePayment flex-1 bg-slate-900 p-6 rounded-lg flex flex-col w-full md:w-1/2">
            <h2 className="text-lg font-bold mb-4">Make Payment</h2>
            <PaymentForm
              onPaymentSuccess={() => router.refresh()}
              toUser={trimUsername}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
