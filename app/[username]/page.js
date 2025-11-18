import React from "react";
import PaymentForm from "@/components/PaymentForm";
import PaymentPage from "@/components/PaymentPage";

export default async function UsernamePage({ params }) {
  const { username } = await params;
  const trimUsername = decodeURIComponent(username);

  return (
    <>
     <PaymentPage trimUsername={trimUsername} />
    </>
  );
}
