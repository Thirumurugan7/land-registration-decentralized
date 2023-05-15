"use client";
import React, { useState } from "react";
import { RegisterUser } from "@/components/Blockchain";
export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitted");
    console.log(name, email, phoneNumber);
    const res = await RegisterUser({ name, email, phoneNumber });
    console.log(res, res.hash);
  };
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl text-black font-bold mb-6">Regsiter Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="text-gray-800 block mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full  rounded-md px-4 py-2 border text-black border-blue-800 focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="text-gray-800 block mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full  rounded-md px-4 py-2 border text-black border-blue-800 focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="text-gray-800 block mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full  rounded-md px-4 py-2 border text-black border-blue-800 focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter your phone number"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-6 py-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
