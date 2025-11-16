import React from "react";
import PaymentForm from "@/components/PaymentForm";

export default async function UsernamePage({ params }) {
  const { username } = await params;
  const trimUsername = decodeURIComponent(username);

  return (
    <>
      <div className="cover w-full relative">
        <img
          src="/patreon_banner.gif"
          alt="banner"
          className="w-full object-cover h-[320px]"
        />
        <div className="profile-img">
          <img
            src="/profile-img.gif"
            alt="profile"
            className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full border-4 border-white object-cover"
          />
        </div>
      </div>

      <div className="profile-info flex items-center justify-center flex-col w-full">
        <div className="info mx-auto my-24 text-center">
          <h2 className="text-xl font-bold text-slate-200 capitalize">
            {trimUsername}
          </h2>
          <h5 className="text-slate-600">
            Hey I am developer, pleasure to meet you hacker
          </h5>

          <div className="stats flex items-center justify-center gap-4">
            <span className="font-bold text-xs text-slate-400">
              • 9178 members
            </span>
            <span className="font-bold text-xs text-slate-400">• 90 posts</span>
            <span className="font-bold text-xs text-slate-400">
              • $12,343/release
            </span>
          </div>
        </div>

        <div className="payment-info flex items-stretch justify-center gap-6 mt-10 w-[90%]">
          {/* Left Support Box */}
          <div className="support flex-1 bg-slate-900 p-6 rounded-lg flex flex-col justify-between w-1/2">
            <h2 className="text-lg font-bold mb-4">Support</h2>
            <ul className="flex-1 flex flex-col justify-evenly gap-2 text-white">
              <li>
                1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
                cum nihil sint.
              </li>
              <li>
                2 Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Reiciendis molestiae corporis sit.
              </li>
              <li>
                3 Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Praesentium aliquam ipsum veniam?
              </li>
              <li>
                4 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
                quos et impedit.
              </li>
              <li>
                5 Lorem, ipsum dolor sit amet consectetur adipisicing elit. In
                recusandae ut quisquam?
              </li>
            </ul>
          </div>

          {/* Right Payment Box */}
          <div className="makePayment flex-1 bg-slate-900 p-6 rounded-lg flex flex-col w-1/2">
            <h2 className="text-lg font-bold mb-4">Make Payment</h2>
            <PaymentForm />
          </div>
        </div>
      </div>
    </>
  );
}
