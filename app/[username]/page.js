import React from "react";
import PaymentForm from "@/components/PaymentForm";
import PaymentPage from "@/components/PaymentPage";
import { fetchPayment, fetchUser } from "@/action/useractions";

import { notFound } from "next/navigation";

export default async function UsernamePage({ params }) {
  const { username } = await params;
  const trimUsername = decodeURIComponent(username);

  // Fetch payments from database
  const payments = await fetchPayment(trimUsername);
  const user = await fetchUser(trimUsername);

  if (!user) {
    notFound();
  }

  console.log("🔍 Fetching payments for username:", trimUsername);
  console.log("📊 Payments found:", payments);
  console.log("📊 Number of payments:", payments?.length || 0);

  return (
    <>
      <PaymentPage trimUsername={trimUsername} payment={payments} user={user} />
    </>
  );
}
