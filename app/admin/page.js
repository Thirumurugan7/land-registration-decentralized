"use client";
import { useEffect, useState } from "react";
import { AllUsers, UserData } from "@/components/Blockchain";
import Table from "@/components/Table";
export default function admin() {
  const [users, setUsers] = useState(false);
  const [gotdata, setGotdata] = useState(false);
  var thiru = false;
  const userDataFromChain = [];
  const userAddressFromChain = [];
  useEffect(() => {
    const getAllUsers = async () => {
      const res = await AllUsers();
      console.log(res);
      console.log(res.length);
      const resLength = res.length;
      for (let i = 0; i < resLength; i++) {
        console.log(res[i]);
        const address = res[i];
        userAddressFromChain.push(address);
        // const userData = await UserData({ res[0] });
        // console.log(userData);
        console.log(address);
        const userData = await UserData({ address });

        console.log(userData[0], i);

        userDataFromChain.push(userData);
        console.log(userDataFromChain);
        userDataFromChain.map((data) => {
          console.log(data[0]);
          console.log(data[4]);
        });
        console.log(userAddressFromChain);
      }
      thiru = true;

      //console.log(address);
    };
    getAllUsers();
    console.log(thiru);
    if (gotdata) {
      alert("got it my boy");
    }
    console.log(users);
  }, []);

  const table = () => {
    for (let i = 0; i <= userAddressFromChain.length; i++) {
      userDataFromChain?.map((data) => (
        <tr className="border-b dark:border-neutral-500">
          <td className="whitespace-nowrap px-6 py-4 font-medium">1</td>
          <td className="whitespace-nowrap px-6 py-4">{data[0]}</td>
          <td className="whitespace-nowrap px-6 py-4">{data[1]}</td>
          <td className="whitespace-nowrap px-6 py-4">{data[2]}</td>
          <td className="whitespace-nowrap px-6 py-4">{data[2]}</td>
          <td className="whitespace-nowrap px-6 py-4">{data[2]}</td>
        </tr>
      ));
    }
  };
  return thiru && <Table userDataFromChain={userDataFromChain} />;
}
