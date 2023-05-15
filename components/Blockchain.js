import { ethers } from "ethers";

import Web3 from "web3";
import abi from "./abi.json";
const isBrowser = () => typeof window !== "undefined"; //The approach recommended by Next.js
const { ethereum } = isBrowser();
if (ethereum) {
  isBrowser().web3 = new Web3(ethereum);
  isBrowser().web3 = new Web3(isBrowser().web3.currentProvider);
}

const CONTRACT_ADDRESS = "0x197E6EC38DD01f54296e0AFbf8854F75e85548B5";

const Register = async ({ name, email, phonenumber }) => {
  console.log("register started from bc");
  console.log("registering started ....");
  let provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  console.log(provider);
  const signer = provider.getSigner();
  console.log(signer);
  const Role = new ethers.Contract(CONTRACT_ADDRESS, config, signer);
  const res = await Role.register(name, email, phonenumber);
  console.log(res);
  console.log("registered");
  window.alert("You are registered");
  return true;
};
