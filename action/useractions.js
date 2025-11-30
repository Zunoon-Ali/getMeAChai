"use server";
import connectDb from "@/db/connectDb";
import User from "@/models/User";
import Payment from "@/models/Payment";

export const fetchUser = async (username) => {
  await connectDb();

  let u = await User.findOne({
    $or: [{ username: username }, { email: username }],
  }).lean();

  if (!u) {
    return null;
  }

  // Serialize for Next.js
  return {
    ...u,
    _id: u._id.toString(),
    createdAt: u.createdAt?.toString(),
    updatedAt: u.updatedAt?.toString(),
  };
};

export const fetchPayment = async (username) => {
  await connectDb();

  let payments = await Payment.find({ to_user: username, done: true })
    .sort({ amount: -1 })
    .limit(10)
    .lean();

  // Convert MongoDB ObjectId to string for Next.js serialization
  return payments.map((payment) => ({
    ...payment,
    _id: payment._id.toString(),
  }));
};

export const updateProfile = async (data, oldusername) => {
  await connectDb();
  let ndata = Object.fromEntries(data);
  console.log("updateProfile received (raw):", ndata);
  console.log("Keys in ndata:", Object.keys(ndata));

  // Filter out File objects (which cause CastError in MongoDB)
  for (let key in ndata) {
    if (
      ndata[key] &&
      typeof ndata[key] === "object" &&
      ndata[key].size !== undefined
    ) {
      console.log("Removing File object:", key);
      delete ndata[key];
    }
  }

  console.log("updateProfile after filtering:", ndata);

  // Store the user ID before removing metadata
  const userId = ndata._id;

  // Remove MongoDB metadata fields that shouldn't be updated
  delete ndata._id;
  delete ndata.__v;
  delete ndata.createdAt;
  delete ndata.updatedAt;

  console.log("Data to update (after removing metadata):", ndata);
  console.log("Updating user with ID:", userId);

  if (oldusername !== ndata.username) {
    // Check if another user (not this one) has this username
    let u = await User.findOne({
      username: ndata.username,
      _id: { $ne: userId }, // Exclude current user
    });
    if (u) {
      return { error: "Username already exists" };
    }
  }

  try {
    const result = await User.updateOne({ _id: userId }, { $set: ndata });
    console.log("Update result:", result);
    console.log("Matched count:", result.matchedCount);
    console.log("Modified count:", result.modifiedCount);

    if (result.matchedCount === 0) {
      console.error("No user found with ID:", userId);
      return { error: "User not found" };
    }

    // If username changed, update all payments associated with the old username
    if (oldusername !== ndata.username) {
      console.log(
        `Username changed from ${oldusername} to ${ndata.username}. Updating payments...`
      );
      const paymentUpdateResult = await Payment.updateMany(
        { to_user: oldusername },
        { $set: { to_user: ndata.username } }
      );
      console.log("Payment update result:", paymentUpdateResult);
    }

    return { success: true };
  } catch (error) {
    console.error("Update error:", error);
    throw error;
  }
};
