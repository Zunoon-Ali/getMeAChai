import React from "react";

const username = async ({ params }) => {
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
      <div className="profile-info flex items-center justify-center">
        <div className="info mx-auto my-24 text-center">
          <h2 className="text-xl font-bold text-slate-200 capitalize">{trimUsername}</h2>
          <h5 className="text-slate-600">
            Hey I am developer pleaseure to meet you hacker
          </h5>
          <div className="stats flex items-center justify-center gap-4">
            <span className="font-bold text-xs text-slate-400">
              . 9178 members
            </span>
            <span className="font-bold text-xs text-slate-400">. 90 posts</span>
            <span className="font-bold text-xs text-slate-400">
              . $12,343/release
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default username;
