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
        <div className="info mx-auto mt-24 mb-10 text-center">
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

        <div className="payment-info flex items-stretch justify-center gap-6 mt-4 w-[90%]">
          {/* Left Support Box */}
          <div className="support flex-1 bg-slate-900 p-6 rounded-lg flex flex-col justify-between w-1/2">
            <h2 className="text-lg font-bold mb-4">Support</h2>
            <ul className="flex-1 flex flex-col gap-2 text-white">
              <li>
                <div className="my-2 flex items-center">
                  <img
                    src="/assets/avatar.gif"
                    alt="avatar"
                    width={30}
                    className="mr-2 rounded-full"
                  />

                  <span className="text-sm leading-5">
                    <span className="text-lg font-semibold">Rohan Ali</span>{" "}
                    donated <strong className="text-md">$10</strong> with a
                    message:{" "}
                    <span className="italic">
                      “ I support you bro, lots of love ♥. ”
                    </span>
                  </span>
                </div>
              </li>
              <li>
                <div className="my-2 flex items-center">
                  <img
                    src="/assets/avatar.gif"
                    alt="avatar"
                    width={30}
                    className="mr-2 rounded-full"
                  />

                  <span className="text-sm leading-5">
                    <span className="text-lg font-semibold">Rohan Ali</span>{" "}
                    donated <strong className="text-md">$10</strong> with a
                    message:{" "}
                    <span className="italic">
                      “ I support you bro, lots of love ♥. ”
                    </span>
                  </span>
                </div>
              </li>
              <li>
                <div className="my-2 flex items-center">
                  <img
                    src="/assets/avatar.gif"
                    alt="avatar"
                    width={30}
                    className="mr-2 rounded-full"
                  />

                  <span className="text-sm leading-5">
                    <span className="text-lg font-semibold">Rohan Ali</span>{" "}
                    donated <strong className="text-md">$10</strong> with a
                    message:{" "}
                    <span className="italic">
                      “ I support you bro, lots of love ♥. ”
                    </span>
                  </span>
                </div>
              </li>
              <li>
                <div className="my-2 flex items-center">
                  <img
                    src="/assets/avatar.gif"
                    alt="avatar"
                    width={30}
                    className="mr-2 rounded-full"
                  />

                  <span className="text-sm leading-5">
                    <span className="text-lg font-semibold">Rohan Ali</span>{" "}
                    donated <strong className="text-md">$10</strong> with a
                    message:{" "}
                    <span className="italic">
                      “ I support you bro, lots of love ♥. ”
                    </span>
                  </span>
                </div>
              </li>
              <li>
                <div className="my-2 flex items-center">
                  <img
                    src="/assets/avatar.gif"
                    alt="avatar"
                    width={30}
                    className="mr-2 rounded-full"
                  />

                  <span className="text-sm leading-5">
                    <span className="text-lg font-semibold">Rohan Ali</span>{" "}
                    donated <strong className="text-md">$10</strong> with a
                    message:{" "}
                    <span className="italic">
                      “ I support you bro, lots of love ♥. ”
                    </span>
                  </span>
                </div>
              </li>
              <li>
                <div className="my-2 flex items-center">
                  <img
                    src="/assets/avatar.gif"
                    alt="avatar"
                    width={30}
                    className="mr-2 rounded-full"
                  />

                  <span className="text-sm leading-5">
                    <span className="text-lg font-semibold">Rohan Ali</span>{" "}
                    donated <strong className="text-md">$10</strong> with a
                    message:{" "}
                    <span className="italic">
                      “ I support you bro, lots of love ♥. ”
                    </span>
                  </span>
                </div>
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
