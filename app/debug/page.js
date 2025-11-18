"use client";

import { useSession } from "next-auth/react";

export default function Debug() {
  const { data: session } = useSession();

  console.log("SESSION:", session);

  return (
    <pre className="text-white p-4 bg-black">
      {JSON.stringify(session, null, 2)}
    </pre>
  );
}
