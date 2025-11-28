"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { updateProfile, fetchUser } from "@/action/useractions";

const Dashboard = () => {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  // ------------------ ALL HOOKS MUST BE HERE ------------------
  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    profilePic: "",
    coverPic: "",
    safepayId: "",
    safepaySecret: "",
  });

  const [touched, setTouched] = useState({});
  // -------------------------------------------------------------

  const getData = async () => {
    if (session && session.user && session.user.email) {
      let u = await fetchUser(session.user.email);
      if (u) {
        setForm({
          ...form,
          ...u,
          profilePic: u.profilePic || "",
          coverPic: u.coverPic || "",
        });
      }
    }
  };

  useEffect(() => {
    getData();
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") return <p>Loading...</p>;

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    setForm({
      ...form,
      [id]: files ? files[0] : value,
    });
  };

  const markTouched = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  const errors = {
    name: !/^[A-Za-z ]+$/.test(form.name) ? "Only letters allowed" : "",
    email: !/^\S+@\S+\.\S+$/.test(form.email) ? "Invalid email format" : "",
    username: form.username.length < 3 ? "Username too short" : "",
    profilePic: "", // Optional field
    coverPic: "", // Optional field
    safepayId: form.safepayId.length < 5 ? "Invalid Safepay ID" : "",
    safepaySecret:
      form.safepaySecret.length < 5 ? "Invalid Safepay Secret" : "",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasError = Object.values(errors).some((e) => e !== "");
    if (hasError) {
      alert("Fix errors before submitting.");
      return;
    }

    // Create FormData from form state
    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    console.log("Submitting form data:", form);

    try {
      const result = await updateProfile(formData, session.user.email);
      console.log("Update result from server:", result);

      if (result && result.error) {
        alert("Update failed: " + result.error);
        return;
      }

      await update(); // Update session
      alert("Profile Updated Successfully!");

      // Reload data to show updated values
      await getData();
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update profile: " + error.message);
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-1/2 bg-slate-800 p-6 rounded-xl shadow-xl text-slate-50 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center">Profile Settings</h2>

        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full p-2 bg-slate-700 rounded text-slate-50"
              value={form.name}
              onChange={handleChange}
              onBlur={() => markTouched("name")}
            />
            {touched.name && errors.name && (
              <p className="text-red-400 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full p-2 bg-slate-700 rounded text-slate-50"
              value={form.email}
              onChange={handleChange}
              onBlur={() => markTouched("email")}
            />
            {touched.email && errors.email && (
              <p className="text-red-400 text-sm">{errors.email}</p>
            )}
          </div>
        </div>

        {/* Username */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="username" className="block mb-1">
              Username
            </label>
            <input
              id="username"
              type="text"
              className="w-full p-2 bg-slate-700 rounded text-slate-50"
              value={form.username}
              onChange={handleChange}
              onBlur={() => markTouched("username")}
            />
            {touched.username && errors.username && (
              <p className="text-red-400 text-sm">{errors.username}</p>
            )}
          </div>
        </div>

        {/* Profile Pic */}
        <div>
          <label className="block mb-1">Profile Picture</label>
          <input
            id="profilePic"
            type="text"
            className="w-full p-2 bg-slate-700 rounded text-slate-50"
            value={form.profilePic}
            onChange={handleChange}
            onBlur={() => markTouched("profilePic")}
            name="profilePic"
            placeholder="Enter image URL"
          />
          {touched.profilePic && errors.profilePic && (
            <p className="text-red-400 text-sm">{errors.profilePic}</p>
          )}
        </div>

        {/* Cover Pic */}
        <div>
          <label className="block mb-1">Cover Picture</label>
          <input
            id="coverPic"
            type="text"
            className="w-full p-2 bg-slate-700 rounded text-slate-50"
            value={form.coverPic}
            onChange={handleChange}
            onBlur={() => markTouched("coverPic")}
            name="coverPic"
            placeholder="Enter image URL"
          />
          {touched.coverPic && errors.coverPic && (
            <p className="text-red-400 text-sm">{errors.coverPic}</p>
          )}
        </div>

        {/* Safepay ID */}
        <div>
          <label htmlFor="safepayId" className="block mb-1">
            Safepay ID
          </label>
          <input
            id="safepayId"
            type="text"
            className="w-full p-2 bg-slate-700 rounded text-slate-50"
            value={form.safepayId}
            onChange={handleChange}
            onBlur={() => markTouched("safepayId")}
          />
          {touched.safepayId && errors.safepayId && (
            <p className="text-red-400 text-sm">{errors.safepayId}</p>
          )}
        </div>

        {/* Safepay Secret */}
        <div>
          <label htmlFor="safepaySecret" className="block mb-1">
            Safepay Secret
          </label>
          <input
            id="safepaySecret"
            type="text"
            className="w-full p-2 bg-slate-700 rounded text-slate-50"
            value={form.safepaySecret}
            onChange={handleChange}
            onBlur={() => markTouched("safepaySecret")}
          />
          {touched.safepaySecret && errors.safepaySecret && (
            <p className="text-red-400 text-sm">{errors.safepaySecret}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded text-white font-semibold"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Dashboard;
