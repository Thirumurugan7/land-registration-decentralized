"use client";
import React, { useState } from "react";
import Logo from "../Assets/navlogo1.png";
import Image from "next/image";
import { LoginUser, LogoutUser } from "./Blockchain";
const Navbar = () => {
  const { ethereum } = typeof window !== "undefined" ? window : {};
  const [account, setAccount] = useState("");
  const [error, setError] = useState("");
  const [connected, setConnected] = useState(false);
  const [login, setLogin] = useState(false);

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

  const handleLogin = async () => {
    console.log("login started at frontend");
    const res = await LoginUser();
    console.log(res);
    setLogin(true);
  };
  const handleLogout = async () => {
    console.log("login started at frontend");
    const res = await LogoutUser();
    console.log(res.hash);
  };
  return (
    <nav className="flex justify-between items-baseline py-4 px-8">
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
      <ul className="flex space-x-4 items-center">
        <li>
          <a href="/register" className="text-white hover:text-gray-600">
            Register
          </a>
        </li>
        {login ? (
          <button
            className="inline-block rounded bg-info px-6 pb-2 pt-2.5 text-xs border font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <button
            className="inline-block rounded bg-info px-6 pb-2 pt-2.5 text-xs border font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]"
            onClick={handleLogin}
          >
            Login
          </button>
        )}

        <li>
          {/* <a href="#" className="text-gray-800 hover:text-gray-600">

          </a> */}
          <button
            className="inline-block rounded bg-info px-6 pb-2 pt-2.5 text-xs border font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]"
            onClick={connectWallet}
          >
            {connected ? account : "connect"}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
