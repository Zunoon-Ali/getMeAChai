"use client";
import React from "react";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

import "./Navbar.css";

const navbar = () => {
  const [showdropdown, setshowdropdown] = useState(false);
  const { data: session } = useSession();
  // if (session) {
  //   return (
  //     <>
  //       Signed in as {session.user.email} <br />
  //       <button onClick={() => signOut()}>Sign out</button>
  //     </>
  //   );
  // }

  return (
    <nav className="bg-blue-950 text-white p-2 flex items-center justify-between w-full">
      <Link href={"/"}>
        <div className="flex items-center pl-2">
          <h1 className="text-2xl font-extrabold flex items-center justify-center">
            GetMeAChai
          </h1>

          <span className="">
            <img
              src="/chai.gif"
              alt="chai"
              className="w-14 h-14 relative -top-1 ml-1"
            />
          </span>
        </div>
      </Link>
      <div className="menuLinks">
        <ul className="flex items-center justify-center gap-6">
          <li>Home</li>
          <li>About</li>
          <li>Product</li>
          <li>Contact</li>
        </ul>
      </div>
      <div className="action">
        {session ? (
          <>
            <button
              onBlur={() => {
                setTimeout(() => {
                  setshowdropdown(false);
                }, 100);
              }}
              id="dropdownDelayButton"
              data-dropdown-toggle="dropdownDelay"
              data-dropdown-delay="500"
              data-dropdown-trigger="hover"
              className="dropdownDelayButton items-center justify-center text-white bg-brand  hover:bg-brand-strong shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none flex"
              type="button"
              onClick={() => {
                setshowdropdown(!showdropdown);
              }}
            >
              Welcome {session.user.email}
              <svg
                className="w-4 h-4 ms-1.5 -me-0.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 9-7 7-7-7"
                />
              </svg>
            </button>

            <div
              id="dropdownDelay"
              className={`z-10 ${
                showdropdown ? "" : "hidden"
              } bg-neutral-primary-medium  rounded-base shadow-lg w-44 absolute top-20 right-5 bg-gray-800 rounded-lg`}
            >
              <ul
                className="p-2 text-sm text-body font-medium"
                aria-labelledby="dropdownDelayButton"
              >
                <li>
                  <Link
                    href={"/dashboard"}
                    className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                  >
                    Your Page
                  </Link>
                </li>

                <li>
                  <Link
                    href="#"
                    className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                    onClick={() => signOut()}
                  >
                    Sign out
                  </Link>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            {/* Login Button */}
            <Link href="/login">
              <button
                type="button"
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-6 py-2.5 rounded-xl"
              >
                Login
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default navbar;
