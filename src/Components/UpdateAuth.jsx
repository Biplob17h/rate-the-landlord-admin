/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../ContextApi/UserContext";
import toast from "react-hot-toast";

const UpdateAuth = ({ show, setShow }) => {
  const { user } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    fetch(`https://rate-the-landlord-server-1.onrender.com/api/v1/admin/updateAuth/${user?._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          toast.success("Authentication updated successfully!");
          setShow("reviews");
        } else {
          alert("Failed to update authentication!");
        }
      });
  };

  return (
    <div className={`${show === "auth" ? "" : "hidden"} px-4 mt-10`}>
      <h1 className="text-3xl font-bold text-center mb-6">
        Update Authentication
      </h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-8 border"
      >
        {/* Email Field */}
        <div className="form-control mb-4">
          <label className="label font-semibold text-gray-600">
            <span>Email Address</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter new email"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Password Field */}
        <div className="form-control mb-6">
          <label className="label font-semibold text-gray-600">
            <span>Password</span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter new password"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="btn bg-blue-600 text-white hover:bg-blue-700"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateAuth;
