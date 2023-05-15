"use client";
import { useEffect, useState } from "react";
import { AllUsers, UserData } from "@/components/Blockchain";
export default function admin() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getAllUsers = async () => {
      const res = await AllUsers();
      console.log(res);
      console.log(res.length);
      const resLength = res.length;
      for (let i = 0; i < resLength; i++) {
        console.log(res[i]);
        const address = res[i];

        // const userData = await UserData({ res[0] });
        // console.log(userData);
        console.log(address);
        const userData = await UserData({ address });
        setUsers((prev) => [...prev, userData]);
        console.log(userData[0]);
        console.log(users);
      }
      //console.log(address);
    };
    getAllUsers();
  }, []);
  return <h1>admin</h1>;
}
