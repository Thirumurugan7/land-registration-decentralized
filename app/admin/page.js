"use client";
import { useEffect } from "react";
import { AllUsers, UserData } from "@/components/Blockchain";
export default function admin() {
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
        console.log(userData[0]);
      }
      //console.log(address);
    };
    getAllUsers();
  }, []);
  return <h1>admin</h1>;
}
