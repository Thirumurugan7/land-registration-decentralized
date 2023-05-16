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

const RegisterUser = async ({ name, email, phoneNumber }) => {
  console.log(name, email, phoneNumber);
  console.log("register started from bc");
  console.log("registering started ....");
  let provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  console.log("provider", provider);
  console.log("provder done");
  const signer = provider.getSigner();
  console.log("sigener", signer);
  console.log("contract", CONTRACT_ADDRESS);
  console.log(abi);
  const Role = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
  console.log("ROLE", Role);
  const res = await Role.register(name, email, phoneNumber);
  console.log(res);
  console.log("registered");
  window.alert(
    "Wait till admin approves you, once approved copy and use the below hash "
  );
  return res;
};

const AllUsers = async () => {
  let provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  // console.log("provider", provider);
  // console.log("provder done");
  const signer = provider.getSigner();
  // console.log("sigener", signer);
  // console.log("contract", CONTRACT_ADDRESS);
  // console.log(abi);
  const Role = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
  //console.log("ROLE", Role);
  const res = await Role.getAllUsers();
  //console.log(res);
  return res;
};

const UserData = async ({ address }) => {
  // console.log(address);

  // console.log("registering started ....");
  let provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  // console.log("provider", provider);
  // console.log("provder done");
  const signer = provider.getSigner();
  // console.log("sigener", signer);
  // console.log("contract", CONTRACT_ADDRESS);
  // console.log(abi);
  const Role = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
  //console.log("ROLE", Role);
  const res = await Role.getUser(address);
  // console.log(res);
  // console.log("got the data");

  return res;
};

const ApproveUser = async ({ userAdd }) => {
  console.log(userAdd);

  console.log("registering started ....");
  let provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  console.log("provider", provider);
  console.log("provder done");
  const signer = provider.getSigner();
  console.log("sigener", signer);
  console.log("contract", CONTRACT_ADDRESS);
  console.log(abi);
  const Role = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
  console.log("ROLE", Role);
  const res = await Role.approveUser(userAdd);
  console.log(res);
  // console.log("got the data");

  return res;
};

const LoginUser = async () => {
  //  console.log(userAdd);

  console.log("registering started ....");
  let provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  console.log("provider", provider);
  console.log("provder done");
  const signer = provider.getSigner();
  console.log("sigener", signer);
  console.log("contract", CONTRACT_ADDRESS);
  console.log(abi);
  const Role = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
  console.log("ROLE", Role);
  try {
    const res = await Role.login();
    console.log(res);
  } catch (error) {
    alert("already login");
  }
  // console.log("got the data");

  return true;
};
const LogoutUser = async () => {
  //  console.log(userAdd);

  console.log("registering started ....");
  let provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  console.log("provider", provider);
  console.log("provder done");
  const signer = provider.getSigner();
  console.log("sigener", signer);
  console.log("contract", CONTRACT_ADDRESS);
  console.log(abi);
  const Role = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
  console.log("ROLE", Role);
  const res = await Role.logout();
  console.log(res);
  if (!res) {
    console.log("failed");
  }
  // console.log("got the data");

  return res;
};

export { RegisterUser, AllUsers, UserData, ApproveUser, LoginUser, LogoutUser };
