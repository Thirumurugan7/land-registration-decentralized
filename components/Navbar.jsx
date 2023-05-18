"use client";
import React, { useState, useEffect } from "react";
import Logo from "../Assets/navlogo1.png";
import Image from "next/image";
import { LoginUser, LogoutUser, UserData } from "./Blockchain";
import { useRouter } from "next/navigation";
import Link from "next/link";
const Navbar = () => {
  const router = useRouter();
  const { ethereum } = typeof window !== "undefined" ? window : {};
  const [account, setAccount] = useState("");
  const [error, setError] = useState("");
  const [connected, setConnected] = useState(false);
  const [login, setLogin] = useState(false);
  const [walletUser, setwalletUser] = useState();
  const [admin, setAdmin] = useState(false);
  const [registered, setRegistered] = useState(false);
  const currentEndpoint = router.asPath;
  const checkEthereumExists = () => {
    if (!ethereum) {
      setError("Please Install MetaMask.");
      return false;
    }
    return true;
  };

  const connectWallet = async () => {
    setError("");
    // const currentEndpoint = window.location.href;
    const currentEndpoint = window.location.pathname;
    const endpointSegments = currentEndpoint.split("/");

    if (checkEthereumExists()) {
      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log(accounts);

        setAccount(accounts[0]);
        console.log(accounts[0].toString());
        console.log(router.asPath);

        if (
          accounts[0].toString() ===
          "0x8d578a6d833b4cf7adca871985dc82c79c76bbde"
        ) {
          console.log("admin in the house");
          console.log(endpointSegments[1]);
          setAdmin(true);
          //  router.push("/admin");
        }
        if (
          accounts[0].toString() ===
            "0x8d578a6d833b4cf7adca871985dc82c79c76bbde" &&
          endpointSegments[1] !== "verifyDocument"
        ) {
          console.log("admin in the house");
          console.log(endpointSegments[1]);
          setAdmin(true);
          router.push("/admin");
        }

        localStorage.setItem("account", accounts[0]);
        setConnected(true);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  useEffect(() => {
    const currentEndpoint = window.location.href;
    connectWallet();
    const res = localStorage.getItem("account");
    setwalletUser(res);

    if (account == "0x8D578a6d833B4cf7adca871985dC82c79c76bbDE") {
      router.push("/admin");
    }

    const IsUSerLoginData = async (address) => {
      const Bres = await UserData({ address });
      console.log(Bres);
      console.log(Bres[4]);
      if (Bres[0].length > 0) {
        setRegistered(true);
      }
      if (Bres[3]) {
        console.log("admin in the house!");
      }
      if (Bres[4] && !Bres[5]) {
        alert("Please Login You are approved by the admin");
      }
      if (Bres[4] && Bres[5]) {
        setLogin(true);
      }
    };
    IsUSerLoginData(res);
  }, []);

  const handleLogin = async () => {
    console.log("login started at frontend");
    const res = await LoginUser();
    console.log(res);
    if (res) {
      setLogin(true);
    }
  };
  const handleLogout = async () => {
    console.log("login started at frontend");
    const res = await LogoutUser();

    if (res) {
      setLogin(false);
    }
  };
  return (
    <nav className="flex justify-between items-baseline py-4 px-8">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => router.push("/")}
      >
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
        {admin || registered ? (
          <div></div>
        ) : (
          <li>
            <a href="/register" className="text-white hover:text-gray-600">
              Register
            </a>
          </li>
        )}

        {login && (
          <Link href="/user_dashboard">
            <button className="inline-block rounded bg-info px-6 pb-2 pt-2.5 text-xs border font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]">
              Dashboard
            </button>
          </Link>
        )}

        {login && !admin ? (
          <button
            className="inline-block rounded bg-info px-6 pb-2 pt-2.5 text-xs border font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          !admin && (
            <button
              className="inline-block rounded bg-info px-6 pb-2 pt-2.5 text-xs border font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]"
              onClick={handleLogin}
            >
              Login
            </button>
          )
        )}

        <li>
          {/* <a href="#" className="text-gray-800 hover:text-gray-600">

          </a> */}
          {walletUser && (
            <button className="inline-block rounded bg-info px-6 pb-2 pt-2.5 text-xs border font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]">
              {walletUser}
            </button>
          )}
          {!walletUser && (
            <button
              className="inline-block rounded bg-info px-6 pb-2 pt-2.5 text-xs border font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]"
              onClick={connectWallet}
            >
              {connected ? account : "connect"}
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
