"use client";
import React, { useState } from "react";
import Logo from "../Assets/navlogo1.png";
import Image from "next/image";

const Navbar = () => {
  const { ethereum } = typeof window !== "undefined" ? window : {};
  const [account, setAccount] = useState("");
  const [error, setError] = useState("");
  const [connected, setConnected] = useState(false);

  const checkEthereumExists = () => {
    if (!ethereum) {
      setError("Please Install MetaMask.");
      return false;
    }
    return true;
  };

  const connectWallet = async () => {
    setError("");
    if (checkEthereumExists()) {
      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log(accounts);
        setAccount(accounts[0]);
        setConnected(true);
      } catch (err) {
        setError(err.message);
      }
    }
  };
  return (
    <nav className="flex justify-between items-center py-4 px-8">
      <div className="flex items-center">
        <Image
          src={Logo}
          alt="Logo"
          width={60}
          height={60}
          className="h-8 mr-2"
        />
        <h1 className="text-xl font-bold">Zk Claims</h1>
      </div>
      <ul className="flex space-x-4">
        <li>
          <a href="#" className="text-gray-800 hover:text-gray-600">
            Register
          </a>
        </li>
        <li>
          <a href="#" className="text-gray-800 hover:text-gray-600">
            Login
          </a>
        </li>

        <li>
          {/* <a href="#" className="text-gray-800 hover:text-gray-600">

          </a> */}
          <button onClick={connectWallet}>
            {connected ? account : "connect"}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
